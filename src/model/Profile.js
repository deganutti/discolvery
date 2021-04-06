let data = {
  name: "Luiz Gabriel Deganutti",
  avatar: "https://avatars.githubusercontent.com/u/18487517?v=4",
  "monthly-budget": 4000,
  "hours-per-day": 7,
  "days-per-week": 6,
  "vacation-per-year": 4,
  "price-hours": 78.85,
};

module.exports = {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  },
};
