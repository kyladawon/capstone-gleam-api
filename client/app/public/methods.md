You make a request with the cell below. This spawns a compute instance that will run our stress test then dump data to the storage buck, then shut down.

```python
import requests
API_KEY = "api_key"
API_URL = "https://.../gleam_simulation_personal_bucket"

headers = {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json"
}

payload = {
    "cpu": 1,
    "io": 1,
    "vm": 1,
    "vm_bytes": "1G",
    "timeout": "1M"
}

response = requests.post(API_URL, json=payload, headers=headers)

if response.status_code == 200:
    print("Request successful!")
    print("Response:", response.json())
else:
    print(f"Error: {response.status_code}, {response.text}")

```

This is how you retrieve the data, you utilize the time stamp given to you from the response above to find the data after the output has been generated. This will zip the data for you and give you a signed download url so that you can download directly from the bucket. Ideally we would have gleam upload the data already zipped so our api never actually has to see the data.

```python
API_URL = "https://.../download-folder"
FOLDER_NAME = "..."  # The folder you want to download based on timestamp outputted from compute run
OUTPUT_ZIP_PATH = "downloaded_folder.zip"  # Where to save the ZIP file
API_KEY = "api_key"


headers = {
    "X-API-Key": API_KEY
}

response = requests.get(f"{API_URL}?folder_name={FOLDER_NAME}", headers=headers, stream=True)

if response.status_code == 200:
    download_url = response.json()["download_url"]
    print(f"Download URL: {download_url}")
    zip_response = requests.get(download_url, stream=True)
    if zip_response.status_code == 200:
        with open("downloaded_folder.zip", "wb") as f:
            for chunk in zip_response.iter_content(chunk_size=8192):
                f.write(chunk)
        print("Downloaded successfully: downloaded_folder.zip")
    else:
        print(f"Error downloading ZIP: {zip_response.status_code}, {zip_response.text}")

else:
    print(f"Error: {response.status_code}, {response.text}")
```

This is for converting the zip file into usuable data

```python
import zipfile
import os

ZIP_FILE_PATH = "downloaded_folder.zip"  # Path to the downloaded ZIP file
EXTRACT_TO = "extracted_data"  # Directory where files will be extracted

os.makedirs(EXTRACT_TO, exist_ok=True)


with zipfile.ZipFile(ZIP_FILE_PATH, 'r') as zip_ref:
    zip_ref.extractall(EXTRACT_TO)

print(f"Files extracted to: {EXTRACT_TO}")
```
