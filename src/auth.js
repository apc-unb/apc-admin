export const isAuthenticated = () => {
    const admin_data = JSON.parse(sessionStorage.getItem('admin'))
    if (admin_data.userexist === true) return true
    return false
};