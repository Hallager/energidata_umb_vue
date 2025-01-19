<template>
  <div class="dashboard">
    <h1>Forecasts and Pricelist</h1>

    <section>
      <h2>Forecasts</h2>
      <div class="forecasts-container">
        <div v-for="(forecast, index) in forecasts" :key="index" class="forecast-card">
          <h3>{{ forecast.ForecastType }}</h3>
          <p><strong>Price Area:</strong> {{ forecast.PriceArea }}</p>
          <p><strong>Day Ahead Forecast:</strong> {{ forecast.ForecastDayAhead }}</p>
          <p><strong>Current Forecast:</strong> {{ forecast.ForecastCurrent }}</p>
          <p><strong>Timestamp (DK):</strong> {{ forecast.TimestampDK }}</p>
        </div>
      </div>
    </section>

    <section>
      <h2>Pricelist</h2>
      <table class="styled-table">
        <thead>
          <tr>
            <th>ChargeOwner</th>
            <th>Note</th>
            <th>ValidFrom</th>
            <th>ValidTo</th>
            <th>Price1</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in pricelist" :key="index">
            <td>{{ record.ChargeOwner }}</td>
            <td>{{ record.Note }}</td>
            <td>{{ record.ValidFrom }}</td>
            <td>{{ record.ValidTo }}</td>
            <td>{{ record.Price1 }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forecasts: [], // Data for forecasts
      pricelist: [], // Data for pricelist
    };
  },
  methods: {
    async fetchData() {
      try {
        // Fetch settings
        const settingsResponse = await fetch(
          "umbraco/delivery/api/v2/content?filter=contentType:settings&fields=properties[pricelistApi,forecastsApi,limitPrice,limitForecasts]"
        );
        const settingsData = await settingsResponse.json();
        const { pricelistApi, limitPrice, forecastsApi, limitForecasts } =
          settingsData.items[0].properties;

        // Fetch pricelist data
        const pricelistResponse = await fetch(`${pricelistApi}?limit=${limitPrice}`);
        const pricelistData = await pricelistResponse.json();
        this.pricelist = pricelistData.records;

        // Fetch forecasts data
        const forecastsResponse = await fetch(`${forecastsApi}?limit=${limitForecasts}`);
        const forecastsData = await forecastsResponse.json();
        this.forecasts = forecastsData.records;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.forecasts-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.forecast-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: calc(46%);
  min-width: 250px;
}

.forecast-card h3 {
  color: #007BFF;
  margin-bottom: 10px;
}

.forecast-card p {
  margin: 5px 0;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.styled-table thead tr {
  background-color: #007BFF;
  color: #ffffff;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
