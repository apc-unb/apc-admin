export const isAuthenticated = () => {
    const admin_data = JSON.parse(localStorage.getItem('admin'))
    if (admin_data.userexist) return true
    return false
};