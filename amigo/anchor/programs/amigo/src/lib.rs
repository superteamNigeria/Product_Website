#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod amigo {
    use super::*;

  pub fn close(_ctx: Context<CloseAmigo>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.amigo.count = ctx.accounts.amigo.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.amigo.count = ctx.accounts.amigo.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeAmigo>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.amigo.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeAmigo<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Amigo::INIT_SPACE,
  payer = payer
  )]
  pub amigo: Account<'info, Amigo>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseAmigo<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub amigo: Account<'info, Amigo>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub amigo: Account<'info, Amigo>,
}

#[account]
#[derive(InitSpace)]
pub struct Amigo {
  count: u8,
}
