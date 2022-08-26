const parseURL = urlString => {
    let result = {};
    try { 
        result['url'] = new URL(urlString);
        result['success'] = true;
    } catch(e) {
        result['success'] = false; 
        result['exception'] = e;
    }
    return result;
};
  
const validateURL = (textval) => {
    return parseURL(textval)['success'];
}

console.log(validateURL("http://www.example.com"));

console.log(validateURL("http://www.example.com/anbcd"));

console.log(validateURL("http://www2.example.com"));
