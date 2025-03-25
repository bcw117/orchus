import os

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import Client, create_client

# Load environment variables
load_dotenv()

# Initialize Supabase client
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)


class CombineRequest(BaseModel):
    agent_ids: list[int]


app = FastAPI(title="API Server", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


@app.get("/")
async def health_check():
    return {"status": "healthy", "message": "API server is running"}


@app.get("/get_marketplace_agents")
async def get_marketplace_agents():
    # Using Supabase client to select all rows from the "agents" table
    response = supabase.table("agent").select("*").execute()

    # Return the data containing marketplace agents information
    return response.data


@app.post("/start_agent_run")
async def start_agent_run():
    import time

    import requests

    # Step 1: Start the agent pipeline at Gumloop
    start_url = "https://api.gumloop.com/api/v1/start_pipeline"
    headers = {
        "Authorization": f"Bearer {os.getenv('GUMLOOP_API_TOKEN')}",
        "Content-Type": "application/json",
    }
    # Payload from environment variables
    payload = {
        "user_id": os.getenv("GUMLOOP_USER_ID"),
        "saved_item_id": os.getenv("GUMLOOP_SAVED_ITEM_ID"),
    }
    try:
        start_response = requests.post(start_url, headers=headers, json=payload)
        start_response.raise_for_status()  # Raise HTTPError for bad responses
        start_data = start_response.json()
        run_id = start_data.get("run_id")
        if not run_id:
            return {"error": "Failed to start the agent pipeline"}, 400

        # Step 2: Poll for the run status
        poll_url = "https://api.gumloop.com/api/v1/get_pl_run"
        poll_headers = {"Authorization": f"Bearer {os.getenv('GUMLOOP_API_TOKEN')}"}
        state = "RUNNING"
        max_polls = 30  # set a maximum to avoid endless loops
        polls = 0
        while state in ["RUNNING", "TERMINATING"] and polls < max_polls:
            time.sleep(2)
            polls += 1
            poll_params = {"run_id": run_id, "user_id": os.getenv("GUMLOOP_USER_ID")}
            poll_response = requests.get(
                poll_url, headers=poll_headers, params=poll_params
            )
            poll_response.raise_for_status()
            poll_data = poll_response.json()
            state = poll_data.get("state")
            if state in ["FAILED", "TERMINATED"]:
                return {"error": "Agent run failed", "state": state}, 400

        # Step 3: Return successful message
        return {
            "message": "Agent completed its task successfully!",
            "run_id": run_id,
            "state": state,
        }
    except Exception as e:
        print(e)
        return {"error": str(e)}, 500


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)


@app.post("/combine")
async def combine(request: CombineRequest):
    agent_ids = request.agent_ids
    # First, create a new orc and get its ID
    orc_response = supabase.table("orc").insert({}).execute()
    orc_id = orc_response.data[0]["id"]  # Get the generated orc id
    try:
        for position, agent_id in enumerate(agent_ids):
            # Insert into orc_agent table with the orc_id
            agent_response = (
                supabase.table("orc_agent")
                .insert({"position": position, "agent_id": agent_id, "orc_id": orc_id})
                .execute()
            )

        return {"status": "success"}
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return {
            "error": str(e),
            "details": "Failed to create orc and insert into orc_agent",
        }
