// 時間戳 -> 時間字串
function formatTimestamp(timestamp) {
    if (timestamp === 0) {
        return '';
    }
    // 创建一个 Date 对象，时间戳是秒，需要乘以 1000 转换为毫秒
    const date = new Date(timestamp * 1000);

    // 获取各个时间部分
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，所以要加 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 格式化为 YYYY-MM-DD HH:mm:ss
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 時間字串 -> 時間戳
function convertToTimestamp(dateString) {
    // 创建一个 Date 对象
    const date = new Date(dateString);

    // 获取 Unix 时间戳（秒）
    const timestamp = Math.floor(date.getTime() / 1000);

    return timestamp;
}

// 取得當天 00:00:00 ~ 23:59:59 的時間範圍
function getTodayRange() {
    const now = new Date();
    const timezoneOffset = 8 * 60; // 台湾时区偏移量（分钟）
    
    // 设置 StartTime 为当天的00:00:00（台湾时间）
    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    startTime.setMinutes(startTime.getMinutes() + timezoneOffset);
    
    // 设置 EndTime 为当天的23:59:59（台湾时间）
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    endTime.setMinutes(endTime.getMinutes() + timezoneOffset);
    
    // 转换为 ISO 格式的字符串，并去掉秒部分
    const formatISODate = (date) => date.toISOString().slice(0, 16);

    return [
        formatISODate(startTime),
        formatISODate(endTime)
    ];
}


// 使用命名导出
export { formatTimestamp, convertToTimestamp, getTodayRange };
