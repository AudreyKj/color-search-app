const obj = { data: { data: { error: "notU" } } };

const {
    data: {
        data: { error }
    }
} = obj;

console.log(error);
