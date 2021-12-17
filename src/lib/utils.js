export const convertArrayToObject = (array, key) =>
    array.reduce((acc, item) => (acc[item[key]] = item, acc), {});

export const sumByGroup = (array, group_key, sum_key) => {
    var result = [];
    array.reduce(function (res, value) {
        if (!res[value[group_key]]) {
            res[value[group_key]] = { [group_key]: value[group_key], [sum_key]: 0 };
            result.push(res[value[group_key]])
        }
        res[value[group_key]][sum_key] += value[sum_key];
        return res;
    }, {});
    return result;
};

export const smallestValue = (array, key) => (
    array.reduce((prev, curr) => prev[key] < curr[key] ? prev : curr)
);
 
export const fetchURLs = async (func, config) => {
    try {
        // Promise.all() lets us coalesce multiple promises into a single super-promise
        var responses = await Promise.all(config.map(element =>
            func(element.url).then((response) =>
                response
            )
        ));

        let ok = true;
        let status = 200;
        const content = {};
        const errors = {};
        for (let index = 0; index < responses.length; index++) {
            const res = responses[index];
            if (!res.ok) {
                ok = false;
                status = res.status;
                try {
                    errors[config[index].key] = await res.json();
                } catch {
                    errors[config[index].key] = `Error while fetching ${config[index].url} - ${res.status}`;
                }

            } else {
                content[config[index].key] = await res.json();
            }
        }
        return {
            ok, status, content, errors,
        }
    } catch (error) {
        console.log(error);
    }
};