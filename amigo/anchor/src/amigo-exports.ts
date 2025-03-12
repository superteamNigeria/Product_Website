// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import AmigoIDL from '../target/idl/amigo.json'
import type { Amigo } from '../target/types/amigo'

// Re-export the generated IDL and type
export { Amigo, AmigoIDL }

// The programId is imported from the program IDL.
export const AMIGO_PROGRAM_ID = new PublicKey(AmigoIDL.address)

// This is a helper function to get the Amigo Anchor program.
export function getAmigoProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...AmigoIDL, address: address ? address.toBase58() : AmigoIDL.address } as Amigo, provider)
}

// This is a helper function to get the program ID for the Amigo program depending on the cluster.
export function getAmigoProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Amigo program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return AMIGO_PROGRAM_ID
  }
}
