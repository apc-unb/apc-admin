export const isAuthenticated = () => {
    const admin_data = JSON.parse(sessionStorage.getItem('admin'))
    if (admin_data === null || admin_data.userexist === false) return false
    return true
};