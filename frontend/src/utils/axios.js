//axios의 인스턴스화 => 중복 제거
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ?
        '': import.meta.env.VITE_SERVER_URL // 배포 시 ''에 URL 삽입, 개발 환경에서는 로컬호스트 사용
})

axiosInstance.interceptors.request.use(function(config){ //요청 전 다음 코드를 수행함
    config.headers.Authorization = 'Bearer '+localStorage.getItem('accessToken');
    return config;
}, function(err){
    return Promise.reject(err);
})

axiosInstance.interceptors.response.use((response)=>{ //토큰 만료 시 리로드
    return response
}, async function(err){
    if(err.response.data === 'jwt expired'){
        window.location.reload();
    }
    return Promise.reject(err);
})
export default axiosInstance;