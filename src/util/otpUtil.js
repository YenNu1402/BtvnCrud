import { GetCurrentDate } from './dateUtil.js'
export const RandomOTP = () => {
    return Math.floor( 100000 + Math.random() * 900000 )
}
export const GetExpiredOtp = () => {
    const date = GetCurrentDate();
    // Set the expiration time to 5 minutes from now
    const expireTime = new Date(date.getTime() + 5 * 60 * 1000);
    return expireTime;
}