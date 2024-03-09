
export function PrivateRoute( {children} ) {

    if (localStorage.getItem("name"))
     return (children);
}
