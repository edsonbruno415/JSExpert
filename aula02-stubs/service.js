const https = require('https');

class Service {

  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        response.on('data', (data) => resolve(JSON.parse(data)));
        response.on('error', (error) => reject(error));
      });
    });
  }

  async getPlanet(url) {
    const { name, surface_water, films } = await this.makeRequest(url);

    return {
      name,
      surfaceWater: surface_water,
      appearedIn: films.length,
    };
  }
}

module.exports = Service;