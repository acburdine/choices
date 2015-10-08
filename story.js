/* global window */
var ss = window.sessionStorage;

if (!ss.getItem('sally')) {
    ss.setItem('sally', 0);
}

if (!ss.getItem('ken')) {
    ss.setItem('ken', 0);
}

var increment = function (index) {
    ss.setItem(index, parseInt(ss.getItem(index)) + 1);
};

var decrement = function(index) {
    ss.setItem(index, parseInt(ss.getItem(index)) - 1);
};

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
// 2 - fresh neutral
{
    message: "It/s early fall on the first day of school. As you leave your house, you notice both Ken and Sally preparing to head to school themselves.  Sally is catching a ride with some of her friends and there is only one seat left in the car.  Ken, on the other hand, has just stepped out of his house and is about to walk to school alone.\\\\You have the opportunity to go to school with either one. Who do you choose?",
    proceed: [
        {
            msg: "Walk to school with Ken",
            next: function () {
                increment('ken');
                return {
                    response: "Ken is delighted at your decision to accompany him.  On your way to school, you both tell a little about yourselves.  You learn that Ken is a freshman too and that he has lived in the area his entire life.  Ken appears to be a little nervous about his first day of high school, but is somewhat relieved by your company.",
                    next: 3
                };
            }
        },
        {
            msg: "Ride to school with Sally and her friends",
            next: function () {
                increment('sally');
                return {
                    response: "Sally lets out a happy shout and opens the door for you.  You hop in and soon introduce yourself to her and her friends. Right away, you can tell that Sally has an outgoing personality and that she is definitely a people-person. You soon discover that Sally is quite popular in school and is eagerly awaiting her first day of high school.",
                    next: 4
                };
            }
        }
    ]
},
// 3 - fresh ken
{
    message: "One morning, while you and Ken are on your way to school together, Ken opens up to you.  He tells you about how his father left him and his mother when he was only 5 years old.  Since then, he tells you that his mother met a guy and remarried.\\\\However, as Ken continues, you learn that his relationship with his stepdad is questionable at best and that Ken deals with physical and verbal abuse from time to time.\\\\How do you react to what you/ve just heard?",
    proceed: [
        {
            msg: "Be supportive and try to console Ken.",
            next: function () {
                increment('ken');
                return {
                    response: "Ken lets out a sigh of relief and the two of you walk happily the rest of the way to school.",
                    next: 5
                };
            }
        },
        {
            msg: "State that you don\'t know what to say.",
            next: {
                response: "An awkward silence falls over the two of you and you both walk quietly beside one another the rest of the way to school.",
                next: 5
            }
        },
        {
            msg: "Tell Ken that life is unfair and that he should suck it up.",
            next: function () {
                decrement('ken');
                return {
                    response: "Ken lets out a quiet whimper and pushes you aside before running ahead into the high school and out of your sight.",
                    next: 5
                };
            }
        }
    ]
},
// 4 - fresh sally
{
    message: "One day at school, after biology class together, Sally approaches you to see what you got on your last Biology exam. You did well and got a 93% on your exam and curiously, Sally got the exact same score.  You ask her about her score and she admits to you that she copied off your exam.\\\\She checks to see your reaction and asks if you wouldn/t be opposed to her continuing to copy off your future exams.  After all, biology is her weakest subject and she doesn/t want to fail.\\\\What do you choose to do?",
    proceed: [
        {
            msg: "Shrug and inform her that you don\'t mind her copying off your exams in the future.",
            next: function () {
                increment('sally');
                return {
                    response: "She gives you a big hug and thanks you for being so cool about agreeing to help her through the class.",
                    next: 5
                };
            }
        },
        {
            msg: "Inform her that you\'d rather her do her own work, but you don\'t care too much.",
            next: {
                response: "She sighs a little bit and apologizes for copying in the first place.  She\'ll probably continue to do it, but at least she said she is sorry.",
                next: 5
            }
        },
        {
            msg: "You condemn her actions and threaten to report her to the teacher next time she copies off you.",
            next: function () {
                return {
                    response: "She is caught off guard by your reaction and retreats down the hallway, without saying another word to you.",
                    next: 5
                }
            }
        }
    ]
},
// 5 - soph netural
{
    message: "A year has passed and you can/t believe that you/re already back in school again.  You/re not sure if you/re ready for your sophomore year, but you/re feeling optimistic.  As more students shamble into your history class, you notice Sally and Ken among them.  They both take their seats around you and class begins.\\\\Surprise! A group project gets assigned on the very first day! The entire class grumbles, but luckily, the three of you get placed in a group together. The teacher explains that each group is supposed to give a ten minute presentation on a certain natural or man-made monument.  Ken offers the idea of doing the project on Mt. Kilimanjaro, but Sally wants to keep it simple and thinks it would be better to do the project on the Eiffel Tower.\\\\What do you choose to do?",
    proceed: [
        {
            msg: "Side with Ken and vote on Mt. Kilimanjaro.",
            next: function () {
                increment('ken');
                decrement('sally');
                return {
                    response: "Ken lets off a fist pump and gives you a high five for siding with him over Sally. Class goes on, but Sally doesn\'t seem pleased with your decision and remains quiet the rest of the class.",
                    next: 6
                };
            }
        },
        {
            msg: "Remain neutral and let them hash it out.",
            next: function () {
                var ken = ss.getItem('ken'),
                    sally = ss.getItem('sally'),
                    next = (parseInt(ken) > parseInt(sally)) ? 6 : 7;
                
                return {
                    response: "The two of the stare at you expectantly before resuming their argument with one another.  Both refuse to back down and eventually the teacher intervenes and forces your group to work on Mt. Rushmore instead.",
                    next: next
                };
            }
        },
        {
            msg: "Side with Sally and vote in favor of the Eiffel Tower.",
            next: function () {
                increment('sally');
                decrement('ken');
                
                return {
                    response: "Sally smiles at your response and turns to Ken mockingly.  Ken can hardly believe that you would choose Sally over him and slams his fist into his desk, before sitting red-faced for the rest of the hour.",
                    next: 7
                };
            }
        }
    ]
},
// 6 - soph ken
{
    message: "One day, Ken approaches you and informs you of a fight that he and his girlfriend, Jane, had earlier that morning.  You learn that the two have been together since 8th grade but have had many ups and downs in their relationship.\\\\After a few minutes, you learn that Ken saw Jane talking to another boy earlier while they were walking in between classes. You learn that Ken ran over and embarrassed Jane in front of an entire hallway of people, but he insists that he did the right thing.\\\\How do you react to this situation?",
    proceed: [
        {
            msg: "Agree with Ken and reassure him that Jane was in the wrong.",
            next: function () {
                increment('ken');
                return {
                    response: "Ken nods his head and is thankful that you agree with his course of action.",
                    next: 8
                };
            }
        },
        {
            msg: "Tell Ken that you weren\'t there to assess the situation, so you can\'t make an accurate assessment of right or wrong.",
            next: {
                response: "Ken shrugs in passive understanding and heads off towards his next class and leaves you be.",
                next: 8
            }
        },
        {
            msg: "Side with Jane and tell Ken that he overreacted and needs to calm down a little.",
            next: function () {
                decrement('ken');
                return {
                    response: "Ken can\'t believe that you\'d choose to side with Jane and storms off to his next class.",
                    next: 8
                };
            }
        }
    ]
},
// 7 - soph sally
{
    message: "One afternoon, on your way to your next class, Sally approaches you and asks you for some advice. She wants to know if her crush is a good guy and if you think he’d be good for her.  You know him, he\'s on the school football team, but you\'ve seen how he treats other people.\\\\You’re not a huge fan of this guy, but you can tell that Sally is really interested. How do you handle the situation?",
    proceed: [
        {
            msg: "Recognizing how much she likes him, you ignore your past experiences with him and tell her that he\'s a good guy.",
            next: function () {
                increment('sally');
                return {
                    response: "She giggles and immediately goes to text her friends the good news. She then thanks you and heads off to her next class with a big smile on her face.",
                    next: 8
                };
            }
        },
        {
            msg: "Inform her that you don\'t know him enough to make an accurate judgment of his character.",
            next: {
                response: "She is appreciative that you were willing to take the time to talk with her. Even though you didn\t offer her much help.",
                next: 8
            }
        },
        {
            msg: "Tell her that you don\t think that he is the best guy for her based on his behavior towards you and others.",
            next: function () {
                decrement('sally');
                return {
                    response: "She is surprised at the words you are telling her and a look of distress appears on her face.  She appreciates the honesty, but doesn\'t say much more to you afterwards.",
                    next: 8
                }
            }
        }
    ]
},
// 8 - jun neutral
{
    message: "",
    proceed: [
        
    ]
},
// 9 - jun ken
{
    message: "",
    proceed: [
        
    ]
},
// 10 - jun sal
{
    message: "",
    proceed: [
        
    ]
}
];