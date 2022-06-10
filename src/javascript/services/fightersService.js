import { callApi } from '../helpers/apiHelper';

class FighterService {
  #endpoint = 'fighters.json';

  async getFighters() {
    try {
      const apiResult = await callApi(this.#endpoint);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    
    const fighterDetailsEndpoint = `details/fighter/${id}.json`;
    try{
      const fighterResult = await callApi(fighterDetailsEndpoint);
      return fighterResult;
    } catch(error){
      throw error;
    }
   // console.log(JSON.parse(fighterDetail.content))
    // todo: implement this method
    // endpoint - `details/fighter/${id}.json`;
  }

}

export const fighterService = new FighterService();
