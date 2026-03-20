import { store } from '@/redux/store';
import { logout } from '@/redux/features/auth-slice';

export const handleAuthError = (status: number) => {
    if (status === 401 || status === 403) {
        // Dispatch logout to clear Redux state
        store.dispatch(logout());
        
        // Redirect to sign in page if not already there
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/signin')) {
            window.location.href = '/signin?session_expired=true';
        }
        return true;
    }
    return false;
};
