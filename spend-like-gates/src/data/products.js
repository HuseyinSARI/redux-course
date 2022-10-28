const products = [
    {
        id: "1",
        productName: "Big Mac",
        productPrice: 2,
        image: "https://neal.fun/spend/images/big-mac.jpg",

    },
    {
        id: "2",
        productName: "Flip Flops",
        productPrice: 3,
        image: "https://neal.fun/spend/images/flip-flops.jpg",

    },
    {
        id: "3",
        productName: "Coca-Cola Pack",
        productPrice: 5,
        image: "https://neal.fun/spend/images/coca-cola-pack.jpg",

    },
    {
        id: "4",
        productName: "Movie Ticket",
        productPrice: 12,
        image: "https://neal.fun/spend/images/movie-ticket.jpg",

    },
    {
        id: "5",
        productName: "Book",
        productPrice: 15,
        image: "https://neal.fun/spend/images/book.jpg",

    },
    {
        id: "6",
        productName: "Lobster Dinner",
        productPrice: 45,
        image: "https://neal.fun/spend/images/lobster-dinner.jpg",

    },
    {
        id: "7",
        productName: "Video Game",
        productPrice: 60,
        image: "https://neal.fun/spend/images/video-game.jpg",

    },
    {
        id: "8",
        productName: "Amazon Echo",
        productPrice: 99,
        image: "https://neal.fun/spend/images/amazon-echo.jpg",

    },
    {
        id: "9",
        productName: "Year of Netflix",
        productPrice: 100,
        image: "https://neal.fun/spend/images/year-of-netflix.jpg",

    },
    {
        id: "10",
        productName: "Air Jordans",
        productPrice: 125,
        image: "https://neal.fun/spend/images/air-jordans.jpg",

    },
    {
        id: "11",
        productName: "Airpods",
        productPrice: 199,
        image: "https://neal.fun/spend/images/airpods.jpg",

    },
    {
        id: "12",
        productName: "Gaming Console",
        productPrice: 299,
        image: "https://neal.fun/spend/images/gaming-console.jpg",

    },
    {
        id: "13",
        productName: "Drone",
        productPrice: 350,
        image: "https://neal.fun/spend/images/drone.jpg",

    },
    {
        id: "14",
        productName: "Smartphone",
        productPrice: 699,
        image: "https://neal.fun/spend/images/smartphone.jpg",

    },
    {
        id: "15",
        productName: "Bike",
        productPrice: 800,
        image: "https://neal.fun/spend/images/bike.jpg",

    },
    {
        id: "16",
        productName: "Kitten",
        productPrice: 1500,
        image: "https://neal.fun/spend/images/kitten.jpg",

    },
    {
        id: "17",
        productName: "Puppy",
        productPrice: 1500,
        image: "https://neal.fun/spend/images/puppy.jpg",

    },
    {
        id: "18",
        productName: "Auto Rickshaw",
        productPrice: 2300,
        image: "https://neal.fun/spend/images/auto-rickshaw.jpg",

    },
    {
        id: "19",
        productName: "Horse",
        productPrice: 2500,
        image: "https://neal.fun/spend/images/horse.jpg",

    },
    {
        id: "20",
        productName: "Acre of Farmland",
        productPrice: 3000,
        image: "https://neal.fun/spend/images/acre-of-farmland.jpg",

    },
    {
        id: "21",
        productName: "Designer Handbag",
        productPrice: 5500,
        image: "https://neal.fun/spend/images/designer-handbag.jpg",

    },
    {
        id: "22",
        productName: "Hot Tub",
        productPrice: 6000,
        image: "https://neal.fun/spend/images/video-game.jpg",

    },
    {
        id: "23",
        productName: "Luxury Wine",
        productPrice: 7000,
        image: "https://neal.fun/spend/images/luxury-wine.jpg",

    },
    {
        id: "24",
        productName: "Diamond Ring",
        productPrice: 10000,
        image: "https://neal.fun/spend/images/diamond-ring.jpg",

    },
    {
        id: "25",
        productName: "Jet Ski",
        productPrice: 12000,
        image: "https://neal.fun/spend/images/jet-ski.jpg",

    },
    {
        id: "26",
        productName: "Rolex",
        productPrice: 15000,
        image: "https://neal.fun/spend/images/rolex.jpg",

    },
    {
        id: "27",
        productName: "Ford F-150",
        productPrice: 30000,
        image: "https://neal.fun/spend/images/ford-f-150.jpg",

    },
    {
        id: "28",
        productName: "Tesla",
        productPrice: 75000,
        image: "https://neal.fun/spend/images/tesla.jpg",

    },
    {
        id: "29",
        productName: "Monster Truck",
        productPrice: 150000,
        image: "https://neal.fun/spend/images/monster-truck.jpg",

    },
    {
        id: "30",
        productName: "Ferrari",
        productPrice: 250000,
        image: "https://neal.fun/spend/images/ferrari.jpg",

    },
    {
        id: "31",
        productName: "Single Family Home",
        productPrice: 300000,
        image: "https://neal.fun/spend/images/single-family-home.jpg",

    },
    {
        id: "32",
        productName: "Gold Bar",
        productPrice: 700000,
        image: "https://neal.fun/spend/images/gold-bar.jpg",

    },
    {
        id: "33",
        productName: "McDonalds Franchise",
        productPrice: 1500000,
        image: "https://neal.fun/spend/images/mcdonalds-franchise.jpg",

    },
    {
        id: "34",
        productName: "Superbowl Ad",
        productPrice: 5250000,
        image: "https://neal.fun/spend/images/superbowl-ad.jpg",

    },
    {
        id: "35",
        productName: "Yacht",
        productPrice: 7500000,
        image: "https://neal.fun/spend/images/yacht.jpg",

    },
    {
        id: "36",
        productName: "M1 Abrams",
        productPrice: 8000000,
        image: "https://neal.fun/spend/images/m1-abrams.jpg",

    },
    {
        id: "37",
        productName: "Formula 1 Car",
        productPrice: 15000000,
        image: "https://neal.fun/spend/images/formula-1-car.jpg",

    },
    {
        id: "38",
        productName: "Apache Helicopter",
        productPrice: 31000000,
        image: "https://neal.fun/spend/images/apache-helicopter.jpg",

    },
    {
        id: "39",
        productName: "Mansion",
        productPrice: 45000000,
        image: "https://neal.fun/spend/images/mansion.jpg",

    },
    {
        id: "40",
        productName: "Make a Movie",
        productPrice: 100000000,
        image: "https://neal.fun/spend/images/make-a-movie.jpg",

    },
    {
        id: "41",
        productName: "Boeing 747",
        productPrice: 148000000,
        image: "https://neal.fun/spend/images/boeing-747.jpg",

    },
    {
        id: "42",
        productName: "Mona Lisa",
        productPrice: 780000000,
        image: "https://neal.fun/spend/images/mona-lisa.jpg",

    },
    {
        id: "43",
        productName: "Skyscraper",
        productPrice: 850000000,
        image: "https://neal.fun/spend/images/skyscraper.jpg",

    },
    {
        id: "44",
        productName: "Cruise Ship",
        productPrice: 930000000,
        image: "https://neal.fun/spend/images/cruise-ship.jpg",

    },
    {
        id: "45",
        productName: "NBA Team",
        productPrice: 2120000000,
        image: "https://neal.fun/spend/images/nba-team.jpg",

    },
];

export default products;
