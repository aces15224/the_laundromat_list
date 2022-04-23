function FormBusiness(){
    // function handleSubmit(e){
    //     const firstName = document.getElementById("firstName").value;
    //     const lastName = document.getElementById("lastName").value;
    //     const email = document.getElementById("email").value;
    //     const password = document.getElementById("password").value;
    //     const password2 = document.getElementById("password2").value;
    //     if(password === password2){
    //         submitData(e, firstName, lastName, email, password)
    //     }
    //     else{
    //         console.log("passwords do not match")
    //     }
    // }
    return(
        <form>
            <div className="form-group">
                <label for="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    required
                    // value={firstName}
                    // onChange = {(e) => setFirstName(e.target.value)}
                    name="firstName"
                    className="form-control"
                    placeholder="Enter First Name"
                />
            </div>
            <div className="form-group">
                <label for="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    required
                    // value={lastName}
                    // onChange = {(e) => setLastName(e.target.value)}
                    name="lastName"
                    className="form-control"
                    placeholder="Enter Last Name"
                />
            </div>
            <div className="form-group">
                <label for="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    required
                    // value={email}
                    // onChange = {(e) => setEmail(e.target.value)}
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                />
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    required
                    // value={password}
                    // onChange = {(e) => setPassword(e.target.value)}
                    name="password"
                    className="form-control"
                    placeholder="Create Password"
                />
            </div>
            <div className="form-group">
                <label for="password2">Confirm Password</label>
                <input
                    type="password"
                    id="password2"
                    required
                    // value={password2}
                    // onChange = {(e) => setPassword2(e.target.value)}
                    name="password2"
                    className="form-control"
                    placeholder="Confirm Password"
                />
            </div>
            <button type="submit" className="btn btn-primary btn-block registration-submit">
                Next
            </button>
        </form>
    
    )
}          
        
export default FormBusiness;