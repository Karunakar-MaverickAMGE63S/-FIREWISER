"The FIREWISER Generative AI Decision Engine is a fully realized Minimum Viable Product (MVP) built on AWS. Due to the hackathon time constraint, the Dynamic Triage Overlay, which provides geospatial command and control visualization for emergency services, and environmental conditions are currently utilizing proof-of-concept data modeling to validate the end-to-end workflow. Our AWS-native production roadmap integrates AWS Kinesis for low-latency stream ingestion of evacuee and responder telemetry and Amazon SageMaker for predictive model hosting, ensuring our Amazon Bedrock Agent’s critical decision-making is powered by genuine, up-to-the-second ground truth."

# FIREWISER App - Personalized Evacuation Guidance

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:** Node.js


1. Install dependencies:
   `npm install`
2. **Set API Keys in [.env.local](.env.local):** Define both your AI Service Key (`LLM_API_KEY`) and your Google Maps Key (`VITE_MAPS_API_KEY`).
3. Run the app:
   `npm run dev`


