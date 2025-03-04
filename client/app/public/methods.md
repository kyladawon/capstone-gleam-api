We utilized a **RESTful Architecture** for stateless communication and secured the API with **API keys** for authentication. The API endpoints cover various functionalities including simulation, compute management, machine learning, and data management. Below is an overview of the API's architecture and features:

## API Architecture

- **RESTful Architecture**:
  - Ensures stateless communication via HTTP requests.
- **Authentication**:

  - API keys are used for secure authentication, ensuring that only authorized users can access the API.

- **Access Control**:
  - Each API key is associated with user roles and usage limits to restrict access to authorized users only.

## API Endpoints

- **Endpoint Categories**:

  - Simulation: Handles epidemic simulations and generates high-fidelity data.
  - Compute Management: Manages resources such as compute instances for running simulations.
  - Machine Learning: Handles AI model training, including surrogate models.
  - Data Management: Manages data storage and retrieval operations.

- **Standardization**:
  - Uses the **OpenAPI Specification (YAML format)** for clear, seamless integration and documentation of API endpoints.

## API Security

- **API Key Management**:

  - API keys are securely stored in **Firestore**, with associated user roles and usage limits to manage access control.

- **Rate Limiting**:

  - Restricts users to **10 requests per minute** to prevent abuse and ensure fair usage.

- **Secure Communication**:
  - The API currently uses **HTTP**, with plans to implement **HTTPS** for enhanced data protection and secure communication.

## GLEAM Model Integration

- **Spatial, Stochastic Epidemic Simulation**:
  - The **GLEAM model** integrates real-world population and mobility data to simulate epidemic spread, providing high-fidelity data for training our surrogate model.
- **Input Parameters**:
  - Takes in virus and population attributes, producing outputs that serve as training data for the AI model.

## AI Surrogate Model

- **STNP Model**:

  - The **STNP model** uses the **Bayesian Active Learning** framework to efficiently train on GLEAM simulation data, significantly reducing computational cost.

- **Bayesian Active Learning**:

  - Utilizes the **Latent Information Gain (LIG) function** to select relevant data for model training, improving performance with fewer data points.

- **Model Predictions**:
  - The trained model processes datasets in **batches**, generating predictions efficiently and effectively.

## Cost Estimation

- **Deployment Cost**:
  - Estimated cost for deploying the API on **Google Cloud** is approximately **$2.90/month**, covering services like Compute Engine, Firestore, and API Gateway.

## Stress Testing

- **Load Simulation**:
  - API performance was assessed under high traffic conditions using the **polinux/stress** Docker image to simulate load and ensure reliability under heavy usage.
