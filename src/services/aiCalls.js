const skinAiAPI = async () =>{}

const planGenAiAPI = async () => {
    const samplePlan = [
        {
            category: "Hydration",
            icon: "fa fa-tint",
            title: "Drink 8 glasses of water"
        },
        {
            category: "Learn",
            icon: "fa fa-book-open",
            title: "Read a chapter of a book"
        },
        {
            category: "Mindfulness",
            icon: "fa fa-spa",
            title: "Meditate for 10 minutes"
        },
        {
            category: "Nutrition",
            icon: "fa fa-apple-alt",
            title: "Eat a healthy snack"
        }
    ];
    return samplePlan;
}

module.exports = {skinAiAPI, planGenAiAPI}
