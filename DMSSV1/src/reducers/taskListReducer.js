import axios from 'axios';


export default () => result("1234")



const result = id => {
    //var res = "";
    return (axios({
        method: 'post',
        url: 'http://192.168.43.165:8086/user',
        data: {
            user_id: id,
        }
    }).then(function(response){
        return response // ex.: { user: 'Your User'}
      }))

    /*console.log(res)
    asd = ["asd"]
    return(asd)*/
}
