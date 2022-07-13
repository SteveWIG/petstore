import { config } from "@onflow/fcl";

config({
    "accessNode.api":"http://localhost:8888",
    "discovery.wallet": "http://localhost:8701/fcl/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn"
  })