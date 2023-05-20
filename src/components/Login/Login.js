function Login(props) 
{
    const{userId, setUserId} = props.setUserId;
    console.log(userId);

    return (
        <div className="Login">
            10 - 
            {userId}
        </div>
    );
}

export default Login;
