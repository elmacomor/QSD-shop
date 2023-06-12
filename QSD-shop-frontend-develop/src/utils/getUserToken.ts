let injectedStore:any;
const injectStore=(s:any)=>{
    injectedStore=s;
};

const getUserToken=()=>{
    const access_token=injectedStore?.getState()?.user.access_token;
    console.log("poruka: ",injectedStore?.getState());
    return access_token;
}

export {injectStore,getUserToken}