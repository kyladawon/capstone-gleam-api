# Miscellaneous

## POST /estimate_cost

**Description**: Estimates the cost of running the VM
**Parameters**:

- num_gpu (int)
- num_cpu (int)
- num_ram (int)
- hours (int)

**Returns**: JSON with the cost estimate in US Dollars

---

# Compute Management

## POST /gleam_simulation

**Description**: Creates a dummy stress-test compute instance.
**Parameters**:

- cpu
- io
- vm
- vm_bytes
- timeout

**Returns**: Timestamp of the created instance.

---

## POST /create_compute_with_image

**Description**: Creates a compute instance using a pre-configured image.
**Parameters**:

- days
- sims
- beta
- epsilon
- image

**Returns**: Timestamp of the created instance.

---

## POST /create_image

**Description**: Creates a new VM image in Google Cloud with config files attached based on the contents of folder_name.
**Parameters**:

- bucket_name
- folder_name
- base_image
- image_name

**Returns**: Image name with timestamp.

---

## POST /gleam_simulation_personal_bucket

**Description**: Creates a dummy stress-test compute instance and pipes the data to the user’s storage bucket (not in our GCP project). Requires access to the bucket through a service account.
**Parameters**:

- cpu
- io
- vm
- vm_bytes
- timeout
- service_account
- service_account_key
- bucket_name
- folder_name

**Returns**: Timestamp of the created instance.

---

# Machine Learning Models

## POST /prediction

**Description**: Runs a GLEAM ML model using a pre-trained DCRNN supervisor.
**Parameters**:

- x
- x0

**Returns**: Model inference results.

---

# Data Management

## GET /download_folder

**Description**: Retrieves simulation data from Google Cloud Storage.
**Parameters**:

- folder_name (str)

**Returns**: JSON with download link.

---

## POST /create_yaml

**Description**: Uploads 2 YAMLs for GLEAM
**Parameters**:

- config1 (dict)
- config2 (dict)

**Returns**: Confirmation message.
