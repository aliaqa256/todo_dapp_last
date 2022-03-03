import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x56c60315e3081Cd0357B2ede85B82A599e635Fc5'
  // address of the factory contract deployed on the Rinkeby testnet
);

export default instance;
