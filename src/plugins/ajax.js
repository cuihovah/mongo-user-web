import axios from 'axios';

const instance = axios.create();
instance.interceptors.request.use(config => {
  return config;
});

instance.interceptors.response.use(response => {
  return response.data;
}, err=> {
    debugger;
//   if (err.response) {
//     axios.post('/v1/error', err.response);
//     return Promise.reject(err.response.data);
//   }
  return Promise.reject({ code: err.response.status, message: err.message });
});


function plugin(Vue) {
  if (plugin.installed) {
    return;
  }
  Vue.http = instance;
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
