const continents = [
    {
        "_id": 1,
        "name": "Africa"
    },
    {
        "_id": 2,
        "name": "Europe"
    },
    {
        "_id": 3,
        "name": "Asia"
    },
    {
        "_id": 4,
        "name": "North America"
    },
    {
        "_id": 5,
        "name": "South America"
    },
    {
        "_id": 6,
        "name": "Australia"
    },
    {
        "_id": 7,
        "name": "Antarctica"
    }
]

const prices = [
    {
        "_id": 0,
        "name": "모두",
        "array":[]
    },
    {
        "_id": 1,
        "name": "0 ~ 199원",
        "array":[0, 199]
    },
    {
        "_id": 2,
        "name": "200 ~ 399원",
        "array":[200, 399]
    },
    {
        "_id": 3,
        "name": "400 ~ 599원",
        "array":[400, 599]
    },
    {
        "_id": 4,
        "name": "600 ~ 799원",
        "array":[600, 799]
    },
    {
        "_id": 45,
        "name": "800원 이상",
        "array":[800, 150000]
    },
]

export {
    continents, prices
}