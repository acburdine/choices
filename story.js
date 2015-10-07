var ss = window.sessionStorage;

if (!ss.getItem('sally')) {
    ss.setItem('sally', 0);
}

if (!ss.getItem('ken')) {
    ss.setItem('ken', 0);
}

var increment = function (index) {
    ss.setItem(index, parseInt(ss.getItem(index)) + 1);
}

var decrement = function(index) {
    ss.setItem(index, parseInt(ss.getItem(index)) - 1);
}

var storyData = [
{
    message: "You will be presented with a series of situations. Each situation will present you with several choices. Depending upon the choices you make, the plot of the game will change. Therefore, choose wisely.",
    proceed: {
        msg: "BEGIN",
        next: 1
    }
},
{
    message: "You are a freshman in high school. Fifteen years of age, you recently moved to Boston after your father recently got a promotion at the city/s sewage plant as the new foreman. Your family has recently bought a middle-class, mid-American home in the city/s suburbs.\\\\On your left, lives the Johnsons and their daughter, Sally. Sally has an enthusiastic, upbeat personality. She loves people and the spotlight.\\\\On your right, the Davidsons and their boy, Ken. Ken has a kind-heart, but lets the fear of judgment hold him back. He is a recluse but loves his mother dearly.",
    proceed: [
        {
            msg: "Befriend Sally",
            next: {
                run: function () {
                    console.log('testing');
                    increment('sally');
                    return 2;
                }
            }
        },
        {
            msg: "Befriend Ken",
            next: {
                run: function () {
                    increment('ken');
                    return 3;
                }
            }
        }
    ]
}
]