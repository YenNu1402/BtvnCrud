import { GetCurrentDate } from './dateUtil.js'
export const RandomOTP = () => {
    return Math.floor( 100000 + Math.random() * 900000 )
}
export const GetExpiredOtp = () => {
    const time = GetCurrentDate();
    const expireTime = time.setMinutes( time.getMinutes() + 5 ); // 5 minutes
    return expireTime;
}