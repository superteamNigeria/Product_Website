import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { Amigo } from '../target/types/amigo'

describe('amigo', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Amigo as Program<Amigo>

  const amigoKeypair = Keypair.generate()

  it('Initialize Amigo', async () => {
    await program.methods
      .initialize()
      .accounts({
        amigo: amigoKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([amigoKeypair])
      .rpc()

    const currentCount = await program.account.amigo.fetch(amigoKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Amigo', async () => {
    await program.methods.increment().accounts({ amigo: amigoKeypair.publicKey }).rpc()

    const currentCount = await program.account.amigo.fetch(amigoKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Amigo Again', async () => {
    await program.methods.increment().accounts({ amigo: amigoKeypair.publicKey }).rpc()

    const currentCount = await program.account.amigo.fetch(amigoKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Amigo', async () => {
    await program.methods.decrement().accounts({ amigo: amigoKeypair.publicKey }).rpc()

    const currentCount = await program.account.amigo.fetch(amigoKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set amigo value', async () => {
    await program.methods.set(42).accounts({ amigo: amigoKeypair.publicKey }).rpc()

    const currentCount = await program.account.amigo.fetch(amigoKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the amigo account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        amigo: amigoKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.amigo.fetchNullable(amigoKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
