const prod = process.env.NODE_ENV === "production";

module.exports = {
    "process.env.BASE_URL": prod ? "https://phungnv.herokuapp.com" : "http://localhost:3000",
    "process.env.NAMESPACE": "https://phungnv.herokuapp.com",
    "process.env.AUTH0_CLIENT_ID": "B10LNJYgqmnCkpbvYw2JnQXG4Ej6IFYl",
}