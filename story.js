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
// 1
{
    message: "You are a freshman in high school. Fifteen years of age, you recently moved to Boston after your father recently got a promotion at the city/s sewage plant as the new foreman. Your family has recently bought a middle-class, mid-American home in the city/s suburbs.\\\\On your left, lives the Johnsons and their daughter, Sally. Sally has an enthusiastic, upbeat personality. She loves people and the spotlight.\\\\On your right, the Davidsons and their boy, Ken. Ken has a kind-heart, but lets the fear of judgment hold him back. He is a recluse but loves his mother dearly.",
    proceed: {
        msg: 'Next',
        next: 2
    }
},
// 2
{
    message: "It/s early fall on the first day of school. As you leave your house, you notice both Ken and Sally preparing to head to school themselves.  Sally is catching a ride with some of her friends and there is only one seat left in the car.  Ken, on the other hand, has just stepped out of his house and is about to walk to school alone.\\\\You have the opportunity to go to school with either one. Who do you choose?",
    proceed: [
        {
            msg: "Walk to school with Ken",
            next: {
                run: function () {
                    increment('ken');
                    return {
                        response: "Ken is delighted at your decision to accompany him.  On your way to school, you both tell a little about yourselves.  You learn that Ken is a freshman too and that he has lived in the area his entire life.  Ken appears to be a little nervous about his first day of high school, but is somewhat relieved by your company.",
                        next: 3
                    };
                }
            }
        },
        {
            msg: "Ride to school with Sally and her friends",
            next: {
                run: function () {
                    increment('sally');
                    return {
                        response: "Sally lets out happy shout and opens the door for you.  You hop in and soon introduce yourself to her and her friends. Right away, you can tell that Sally is an outgoing personality and that she is definitely a people-person. You soon discover that Sally is quite popular in school and is eagerly awaiting her first day of high school.",
                        next: 4
                    };
                }
            }
        }
    ]
},
// 3
{
    message: "",
    proceed: [
        
    ]
},
// 4
{
    message: "",
    proceed: []
},
]