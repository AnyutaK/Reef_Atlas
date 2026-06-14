from fastapi import FastAPI
from database import get_connection
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="ReefWatch API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to ReefWatch"}
@app.get("/reefs")
def get_reefs(NUMBER_OF_RESULTS: int = 100, STARTING_ID: int = 0):  
    conn = get_connection()
    reefs = conn.execute("""
        SELECT ReefID,
            ReefName,
            Latitude,
            Longitude,
            AreaSqKm,
            VerificationStatus,
            SurveyMethod
            HealthScore,
            BleachingRisk
        FROM Reef
        LIMIT ? OFFSET ?
    """, (NUMBER_OF_RESULTS, STARTING_ID)).fetchall()
    conn.close()
    return [dict(reef) for reef in reefs]
@app.get("/reef/{reef_id}")
def get_reef(reef_id: int):
    conn = get_connection()
    reef = conn.execute("""
        SELECT *
        FROM Reef
        WHERE ReefID = ?    
    """, (reef_id,)).fetchone()

    conn.close()

    return dict(reef) if reef else {"error": "Reef not found"}
@app.get("/search")
def search_reefs(q: str):
    conn = get_connection()
    reefs = conn.execute("""
        SELECT ReefID,
            ReefName,
            Latitude,
            Longitude,
            AreaSqKm,
            VerificationStatus,
            SurveyMethod,
            HealthScore,
            BleachingRisk
        FROM Reef
        WHERE ReefName LIKE ?
        LIMIT 20
    """, (f"%{q}%",)).fetchall()
    conn.close()
    return [dict(reef) for reef in reefs]
@app.get("/stats")
def get_stats():
    conn = get_connection()
    count = conn.execute(
        "SELECT COUNT(*) FROM Reef"
    ).fetchone()[0]
    largest = conn.execute("""
        SELECT ReefName, AreaSqKm
        FROM Reef
        ORDER BY AreaSqKm DESC
        LIMIT 1
    """).fetchone()
    conn.close()
    return {
        "total_reefs": count,
        "largest_reef": largest[0],
        "largest_area_sqkm": largest[1]
    }
@app.get("/reefs_in_view")
def reefs_in_view(
    north: float,
    south: float,
    east: float,
    west: float
):
    conn = get_connection()
    reefs = conn.execute("""
        SELECT ReefID,
               ReefName,
               Latitude,
               Longitude,
               AreaSqKm,
               VerificationStatus,
               SurveyMethod,
               HealthScore,
               BleachingRisk
        FROM Reef
        WHERE Latitude BETWEEN ? AND ?
        AND Longitude BETWEEN ? AND ?
    """, (
        south,
        north,
        west,
        east
    )).fetchall()
    conn.close()
    return [dict(reef) for reef in reefs]
