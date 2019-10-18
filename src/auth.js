export const isAuthenticated = () => {
    if (localStorage.getItem('admin_exist') === 'true') return true
    return false
};