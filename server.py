from fastapi import FastAPI
from fastapi.responses import HTMLResponse, FileResponse

from mmwi import DataManager

app = FastAPI()

dm = DataManager("/home/aaron/dev/mmwi/database.csv")

@app.get("/favicon.ico")
async def get_favicon():
    return FileResponse("data/favicon.ico")



@app.get("/")
async def get_index():
    with open("src/index.html", "r") as file:
        html_content = file.read()
        return HTMLResponse(content=html_content)
    
@app.get("/index.css")
async def get_script():
    return FileResponse("style/index.css", media_type="text/css")
    


@app.get("/register")
async def get_index():
    with open("src/register.html", "r") as file:
        html_content = file.read()
        return HTMLResponse(content=html_content)
    
@app.get("/register.css")
async def get_script():
    return FileResponse("style/register.css", media_type="text/css")
    
@app.get("/register.js")
async def get_script():
    return FileResponse("scripts/register.js", media_type="application/javascript")

@app.post("/person")
async def create_person(person_data: dict):
    # Call the create_new_person function with the received data
    dm.create_new_person(person_data)
    return {"message": "Person created successfully"}



@app.get("/registration-success")
async def get_index():
    with open("src/registration-success.html", "r") as file:
        html_content = file.read()
        return HTMLResponse(content=html_content)
    
@app.get("/registration-success.css")
async def get_script():
    return FileResponse("style/registration-success.css", media_type="text/css")



@app.get("/check-in")
async def get_index():
    with open("src/check-in.html", "r") as file:
        html_content = file.read()
        return HTMLResponse(content=html_content)
    
@app.get("/check-in.css")
async def get_script():
    return FileResponse("style/check-in.css", media_type="text/css")
    
@app.get("/check-in.js")
async def get_script():
    return FileResponse("scripts/check-in.js", media_type="application/javascript")

@app.get("/people")
async def get_people():
    return dm.get_list_of_names()

@app.post("/checkin")
async def checkin_person(person_name: dict):
    # Call the create_new_person function with the received data
    dm.check_in_person(person_name)
    return {"message": "Checked in successfully"}



@app.get("/check-in-success")
async def get_index():
    with open("src/check-in-success.html", "r") as file:
        html_content = file.read()
        return HTMLResponse(content=html_content)
    
@app.get("/check-in-success.css")
async def get_script():
    return FileResponse("style/check-in-success.css", media_type="text/css")



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, 
                host="0.0.0.0", 
                port=8000
                )