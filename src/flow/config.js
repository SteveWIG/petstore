import { config } from "@onflow/fcl";

config({
    "accessNode.api":"http://localhost:8888",
    "discovery.wallet": "http://localhost:8701/flow/authenticate", // Mainnet: "https://fcl-discovery.onflow.org/authn"
    "challenge.handshake": "http://localhost:8701/flow/authenticate"
  })