enum IpAddresses {
    v4(String),
    v6(String),
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents (coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}

fn main() {
    println!("Hello, world!");

    let kind = IpAddresses::v4(String::from("127.0.0.1"));

    let loopback = IpAddresses::v6(String::from("::1"));
}
