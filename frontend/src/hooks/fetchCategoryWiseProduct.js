


export const fetchCategoryWiseProduct = async(categ) =>{
    const response= await fetch(`/api/lfitem/getcategoryitem?category=${categ}`,{
        method:"get",
        headers :{
            "content-type":"application/json",
        },

    })

    const dataResponse = await response.json();

    return dataResponse;
}