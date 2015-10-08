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

var parentsDie = "As you near the end of your senior year, disaster falls. You receive the news one day that Sally's parents have died. It was a terrible car accident and you can only imagine what Sally is going through. You decide to head over to her house to comfort her.";

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
    message: "You are a freshman in high school. Fifteen years of age, you recently moved to Boston after your father recently got a promotion at the city/s sewage plant as the new foreman. Your family has recently bought a middle-class, mid-American home in the city\'s suburbs.\\\\On your left, lives the Johnsons and their daughter, Sally. Sally has an enthusiastic, upbeat personality. She loves people and the spotlight.\\\\On your right, the Davidsons and their boy, Ken. Ken has a kind-heart, but lets the fear of judgment hold him back. He is a recluse but loves his mother dearly.",
    proceed: {
        msg: 'Next',
        next: 2
    }
},
// 2 - fresh neutral
{
    message: "It\'s early fall on the first day of school. As you leave your house, you notice both Ken and Sally preparing to head to school themselves.  Sally is catching a ride with some of her friends and there is only one seat left in the car.  Ken, on the other hand, has just stepped out of his house and is about to walk to school alone.\\\\You have the opportunity to go to school with either one. Who do you choose?",
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
    message: "One morning, while you and Ken are on your way to school together, Ken opens up to you.  He tells you about how his father left him and his mother when he was only 5 years old.  Since then, he tells you that his mother met a guy and remarried.\\\\However, as Ken continues, you learn that his relationship with his stepdad is questionable at best and that Ken deals with physical and verbal abuse from time to time.\\\\How do you react to what you\'ve just heard?",
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
    message: "One day at school, after biology class together, Sally approaches you to see what you got on your last Biology exam. You did well and got a 93% on your exam and curiously, Sally got the exact same score.  You ask her about her score and she admits to you that she copied off your exam.\\\\She checks to see your reaction and asks if you wouldn\'t be opposed to her continuing to copy off your future exams.  After all, biology is her weakest subject and she doesn\'t want to fail.\\\\What do you choose to do?",
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
                };
            }
        }
    ]
},
// 5 - soph netural
{
    message: "A year has passed and you can\'t believe that you\'re already back in school again.  You\'re not sure if you\'re ready for your sophomore year, but you\'re feeling optimistic.  As more students shamble into your history class, you notice Sally and Ken among them.  They both take their seats around you and class begins.\\\\Surprise! A group project gets assigned on the very first day! The entire class grumbles, but luckily, the three of you get placed in a group together. The teacher explains that each group is supposed to give a ten minute presentation on a certain natural or man-made monument.  Ken offers the idea of doing the project on Mt. Kilimanjaro, but Sally wants to keep it simple and thinks it would be better to do the project on the Eiffel Tower.\\\\What do you choose to do?",
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
                    response: "The two of them stare at you expectantly before resuming their argument with one another.  Both refuse to back down and eventually the teacher intervenes and forces your group to work on Mt. Rushmore instead.",
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
    message: "One afternoon, on your way to your next class, Sally approaches you and asks you for some advice. She wants to know if her crush is a good guy and if you think he\'d be good for her.  You know him, he\'s on the school football team, but you\'ve seen how he treats other people.\\\\You\'re not a huge fan of this guy, but you can tell that Sally is really interested. How do you handle the situation?",
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
                response: "She is appreciative that you were willing to take the time to talk with her. Even though you didn\'t offer her much help.",
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
                };
            }
        }
    ]
},
// 8 - jun neutral
{
    message: "After a laborious sophomore year, it\'s finally fall again and now, you\'re into your junior year of high school.  Life is normal, until one day, your father bursts into your room eagerly with concert tickets in his hands.  He explains that he had put his name into a raffle a month prior and that he had just won three tickets to go see a triple-header concert, featuring One Direction, Justin Bieber, and Weird Al!\\\\You learn that he wants to take you with him and that he has one more ticket to spare, because your mother doesn\'t like Justin Bieber. So he suggests that you ask Sally or Ken to tag along.",
    proceed: [
        {
            msg: "Offer the ticket to Ken.",
            next: function () {
                increment('ken');
                decrement('sally');
                return {
                    response: "Ken lets out a girlish squeal when you offer him the ticket and he instantly accepts. You soon discover that he always ends up getting One Direction stuck in his head anyways from how overplayed they are on pop-radio, so he might as well go see them.",
                    next: 9
                };
            }
        },
        {
            msg: "Tell your dad to sell the extra ticket.",
            next: function () {
                var ken = ss.getItem('ken'),
                    sally = ss.getItem('sally'),
                    next = (parseInt(ken) > parseInt(sally)) ? 9 : 10;
                
                return {
                    response: "Your father gives you a puzzled look, before nodding and closing your door.  He ends up selling the ticket like you wanted and using the money to buy himself a Justin Bieber shirt at the concert, because he is a Belieber.",
                    next: next
                };
            }
        },
        {
            msg: "Offer the ticket to Sally.",
            next: function () {
                increment('sally');
                decrement('ken');
                
                return {
                    response: "YES! Sally exclaims as she accepts the ticket you offer her. Later, on the way to the concert, you learn that she has been a Weird Al fan ever since she was 5 years old and can name very song from \"Fat\" all the way to \"Albuquerque\".",
                    next: 10
                };
            }
        }
    ]
},
// 9 - jun ken
{
    message: "One afternoon, as you were heading home from school, you notice Ken sitting alone on the gym bleachers.  You approach him and discover that he was chosen to pick teams for dodgeball earlier that day and that everyone he choose complained about being picked.\\\\Then after the game, some of the guys in the locker room stole Ken\'s cloths and backpack and threw them into the shower.  Which resulted in all of his books and homework being destroyed.\\\\How do you react to the situation?",
    proceed: [
        {
            msg: "Tell him that those guys are just insecure jerks and that you\'ll help him catch back up in class by using your books.",
            next: function () {
                increment('ken');
                return {
                    response: "Ken\'s mood brightens and you help gather his belongs before you both head for home together.",
                    next: 11
                };
            }
        },
        {
            msg: "Tell Ken that you don\'t have time to stick around and diffuse yourself from the situation.",
            next: {
                response: "Ken lets out a soft sigh and watches you as you exit the gym.",
                next: 11
            }
        },
        {
            msg: "Tell him that he hasn\t really done much to contribute to his reputation and, on top of that, that he\'s not very athletic.",
            next: function () {
                decrement('ken');
                return {
                    response: "Your words visibly hurt Ken and his face sinks into his hands as you turn away to leave the gym.",
                    next: 11
                };
            }
        }
    ]
},
// 10 - jun sal
{
    message: "One morning, as you were leaving your house, you notice Sally next door.  She approaches you with a giddy smile on her face.  She informs you that she and a few other friends went out partying the night before. There was alcohol involved as you can smell it lingering upon her breath.\\\\She appears incredibly happy to have told you and is anxiously awaiting your response.  You assume her parents are unaware of her activities the previous night.\\\\What do you decide to do?",
    proceed: [
        {
            msg: "Praise her and ask her to let you know next time she\'s going out.",
            next: function () {
                increment('sally');
                return {
                    response: "Sally is happy by your response and nods.  She\'ll definitely let you know next she\'s out, then she returns to her house as you go about your day.",
                    next: 11
                };
            }
        },
        {
            msg: "Be indifferent and let you know that you\'re not really interested in partying.",
            next: {
                response: "Sally nods and returns inside her home after her mother calls her in for food.",
                next: 11
            }
        },
        {
            msg: "Remind her that she\'s underage and that you\'re considering informing her parents of her actions.",
            next: function () {
                decrement('sally');
                return {
                    response: "Sally becomes cross and glares you done fearfully at your threat. Not sure why you refuse to have any fun, let alone ruin hers.",
                    next: 11
                };
            }
        }
    ]
},
// 11 - senior year beginnings
{
    message: "Senior year has begun. The pinnacle of your high school career.\\\\All of your choices leading up to this point have been important; however, as graduation dawns, your choices become even more important. In fact, they have the ability to change your life.\\\\You head into senior year excited for what it has in store.",
    proceed: function () {
        var ken = parseInt(ss.getItem('ken')),
            sally = parseInt(ss.getItem('sally')),
            next;
        
        if (ken > sally) {
            next = 12;
        } else if (ken === sally) {
            next = 13;
        } else {
            next = 14;
        }
        
        return {
            msg: "Next",
            next: next
        };
    }
},
// 12 - ken ponr
{
    message: "You are walking through the halls of school one day when you come upon a commotion. You see Ken up against a wall of lockers, surrounded by Sally and several of Sally\'s friends.\\\\Sally, leading her friends, is calling Ken horrible names in order to get laughter from her friends. Ken seems more depressed with each name he is called.\\\\What do you do?",
    proceed: [
        {
            msg: "Make Sally look stupid in front of her friends, sticking up for Ken.",
            next: {
                response: "Sally is extremely upset that you made fun of her in front of her friends; however, Ken, although he still seems sad, gives you a hug and thanks you for sticking up for him.",
                next: 15
            }
        },
        {
            msg: "Walk away and ignore the situation.",
            next: {
                response: "You walk away, but as you do Ken catches your eye. His face completely falls as he knows you are abandoning him.",
                next: 16
            }
        }
    ]
},
// 13 - both ponr
{
    message: "It\'s your 18th birthday and you are having an amazing party at your house. The day is going great, but a few hours into it, you hear an argument going on.\\\\You walk over and see Ken and Sally having an argument. You hear that they are arguing over who is the better friend to you. Upon noticing your arrival, they ask you which of them is the better friend.\\\\What do you say?",
    proceed: [
        {
            msg: "Tell Ken that he is the better friend",
            next: {
                response: "Sally is immediately outraged, and storms off. Ken seems initially happy, but then he begins to accuse you of lying because you also spend a significant amount of time with Sally.",
                next: 16
            }
        },
        {
            msg: "Say that they are both good friends and neither is better.",
            next: {
                response: "They resent you because you can\'t decide between the two of them, and you leave to tend to your other guests.",
                next: 16
            }
        },
        {
            msg: "Tell Sally that she is the better friend",
            next: {
                response: "Ken is sad, and leaves the party. Sally initialy is happy because you chose her over Ken, but eventually starts to accuse you of spending too much time with Ken.",
                next: 16
            }
        }
    ]
},
// 14 - sally ponr
{
    message: "After school one day, Sally approaches you as you are heading home from school. She tells you about a party she has planned for that night, and she invites you to come.\\\\However, you know that you also have plans that day with Ken, and he might be hurt if you decide to cancel.\\\\What do you do?",
    proceed: [
        {
            msg: "Go with Sally.",
            next: {
                response: "You eagerly go with Sally to the party. Because you are somewhat ashamed of ditching Ken, you don\'t tell Ken that you are cancelling.",
                next: 17
            }
        },
        {
            msg: "Refuse to go.",
            next: {
                response: "You attempt to refuse going to the party, but Sally is insistent. She ultimately drags you to her car. Because you feel bad about ditching Ken, you text him and let him know you are cancelling. Sally sees you, however, and doesn\'t look pleased.",
                next: 16
            }
        }
    ]
},
// 15 - ken live
{
    message: parentsDie,
    proceed: {
        msg: "Next",
        next: 18
    }
},
// 16 - both die
{
    message: parentsDie,
    proceed: {
        msg: "Next",
        next: 19
    }
},
// 17 - sally live
{
    message: parentsDie,
    proceed: {
        msg: "Next",
        next: 20
    }
},
// 18
{
    message: "Walking out of your house, you notice a small slip of paper on your front porch. You pick it up and examine it. The short scrawl you quickly recognize as Ken\'s handwriting. With some curiosity, you read the note.\\\\\"Thank you for being my friend. You have been there for me throughout all that I\'ve gone through, and I am sorry that it\'s come to this.\\\\I have come to believe that I have no value. I don\'t know if I told you, but I caught Jane cheating on me a few days ago. Since we broke up, I haven\'t been the same.\\\\My stepdad also started beating me again. I started to think that maybe the world would be a better place if I were not in it. At least I wouldn\'t have to feel all this pain.\\\\Goodbye.\"\\\\What do you do?",
    proceed: [
        {
            msg: "Continue to Sally\'s house.",
            next: 21
        },
        {
            msg: "Go to Ken\'s house instead.",
            next: 22
        }
    ]
},
// 19
{
    message: "You hear a commotion coming from the direction of Ken\'s house. You have no idea what is going on, and you debate going to Ken\'s house instead.\\\\What do you do?",
    proceed: [
        {
            msg: "Go to Ken\'s house and investigate the noise.",
            next: 23
        },
        {
            msg: "Continue to Sally\'s house.",
            next: 21
        }
    ]
},
// 20
{
    message: "You hear a commotion coming from the direction of Ken\'s house. You have no idea what is going on, and you debate going to Ken\'s house instead.\\\\What do you do?",
    proceed: [
        {
            msg: "Go to Ken\'s house and investigate the noise.",
            next: 23
        },
        {
            msg: "Continue to Sally\'s house.",
            next: 24
        }
    ]
},
// 21 - sally rejection
{
    message: "You rush over to Sally\'s house. When you get there, her \"friends\" are also there, wanting to go partying. She is about to go with them.\\\\You try to convince her to stay, but you aren\'t able and she goes with them.",
    proceed: {
        msg: "Next",
        next: {
            response: "Leaving her house, you hear sirens coming from your street. Looking outside, you hear them coming from the direction of Ken\'s house. Worried, you venture over.\\\\You walk into Ken\'s room. He\'s lying on the bed, motionless. Policemen walk around the room, talking to other unseen characters. Ken\'s mother is standing in the corner, crying. His stepdad, however, is nowhere to be found.\\\\You look closer at the bed. His face almost seems serene, even in death. There is a small hole in the side of his forehead, and the bed is covered in blood. You hear, as if from far away, someone say: \"It was suicide.\"\\\\You stop and wonder if there was anything you could have done to prevent it. If somehow, your actions could have kept Ken from taking his own life. But alas, it was finished. Nothing could be done for him now. At least it was a quick and painless death.",
            next: {
                response: "You awaken the next morning at the sound of your parents walking into your room.  Their faces are heavy and your room grows still.  You slowly sit up as your mother sits at the end of your bed, your father stands quietly at the side.\\\\They inform you that last night there was an accident.  Police found a smashed up vehicle involved in a head-on collision with a semi.  There were no survivors and Sally was among them. They had been drinking.\\\\You stop and wonder if there was anything you could have done to prevent it.  If somehow, your actions could have kept Sally from going out.  But alas, it was finished.  Nothing could be done for her now.  At least it was a quick and painless death.",
                next: {
                    response: "THE END. Try again?",
                    next: function () {
                        ss.setItem('ken', 0);
                        ss.setItem('sally', 0);
                        return 0;
                    }
                }
            }
        }
    }
},
// 22 - ken living
{
    message: "Scared by the note you found, you rush over to Ken\'s house. Bursting through the front door, you run up the stairs, worry for your friend making your feet quick.\\\\You knock on Ken\'s door. No response. Praying that the door is unlocked, you try the handle. Fortunately it is unlocked, and you rush through the door.\\\\Ken is sitting on his bed, with some sort of of object in his hand next to his temple. With horror, you realize that he has a gun and is about to take his own life. You quickly tackle him to the floor.\\\\The gun goes off, its report momentarily deafening you. You look up with alarm, hoping beyond hope that you were not too late. Ken looks up at you with sunken eyes red from crying. The gun bullet lodged in the ceiling above.\\\\You were able to save Ken\'s life, and although his life will never be the same, he is at least around to experience it.\\\\After helping Ken to the hospital, you return home, pondering the decisions that have led to this point.",
    proceed: {
        msg: "Next",
        next: {
            response: "You awaken the next morning at the sound of your parents walking into your room.  Their faces are heavy and your room grows still.  You slowly sit up as your mother sits at the end of your bed, your father stands quietly at the side.\\\\They inform you that last night there was an accident.  Police found a smashed up vehicle involved in a head-on collision with a semi.  There were no survivors and Sally was among them. They had been drinking.\\\\You stop and wonder if there was anything you could have done to prevent it.  If somehow, your actions could have kept Sally from going out.  But alas, it was finished.  Nothing could be done for her now.  At least it was a quick and painless death.",
            next: {
                response: "THE END. Try again?",
                next: function () {
                    ss.setItem('ken', 0);
                    ss.setItem('sally', 0);
                    return 0;
                }
            }
        }
    }
},
// 23 - ken dying
{
    message: "You head towards Ken\'s house to investigate the noise. As you walk on to the front porch, you hear a loud bang come from the upstairs window. Worry overcomes you and you run upstairs.\\\\Bursting through Ken\'s bedroom door, you find him lying facedown on his bed, a black metallic object in his hand. Blood is all over the sheets.\\\\His mother, awakened from sleep, comes to see. Upon seeing her dead son, she begins weeping uncontrollably. As you look around the room, you notice a slip of paper on the desk. The short scrawl is easily recognizable as Ken\'s handwriting.\\\\\"To whoever reads this note,\\\\I feel like I no longer have any value in this world. No one seems to love me, and I feel like the world would be a better place if I were not in it.\\\\Goodbye.\"\\\\As if in a daze, you leave the house, you stop and wonder if there was anything you could have done to prevent it. If somehow, your actions could have kept Ken from taking his own life. But alas, it was finished. Nothing could be done for him now. At least it was a quick and painless death.",
    proceed: {
        msg: "Next",
        next: {
            response: "You awaken the next morning at the sound of your parents walking into your room.  Their faces are heavy and your room grows still.  You slowly sit up as your mother sits at the end of your bed, your father stands quietly at the side.\\\\They inform you that last night there was an accident.  Police found a smashed up vehicle involved in a head-on collision with a semi.  There were no survivors and Sally was among them. They had been drinking.\\\\You stop and wonder if there was anything you could have done to prevent it.  If somehow, your actions could have kept Sally from going out.  But alas, it was finished.  Nothing could be done for her now.  At least it was a quick and painless death.",
            next: {
                response: "THE END. Try again?",
                next: function () {
                    ss.setItem('ken', 0);
                    ss.setItem('sally', 0);
                    return 0;
                }
            }
        }
    }
},
// 24 - sally living
{
    message: "Upon hearing of the Johnson\'s passing, you rush over to Sally\'s house.  After a moment of knocking, Sally opens the door, her eyes red and wet with tears.  Before you could say a word, she throws herself into your chest, sobbing.  You embrace her and wait a few moments for her to collect herself.\\\\You both go inside and find some tissues for her to dry her tears.  Thank you, she says, barely breathing air.  You side down beside her, comforting her with both words and presence.  She eventually falls asleep as the evening passes.  As you are heading out, you notice some of her \"friends\" waiting in the driveway, wanting to go partying.  You inform them that Sally is asleep inside and they depart from her residence.\\\\You were able to console Sally and although her parents are gone, she knows that she always has you and your family to go to.",
    proceed: {
        msg: "Next",
        next: {
            response: "Leaving her house, you hear sirens coming from your street. Looking outside, you hear them coming from the direction of Ken\'s house. Worried, you venture over.\\\\You walk into Ken\'s room. He\'s lying on the bed, motionless. Policemen walk around the room, talking to other unseen characters. Ken\'s mother is standing in the corner, crying. His stepdad, however, is nowhere to be found.\\\\You look closer at the bed. His face almost seems serene, even in death. There is a small hole in the side of his forehead, and the bed is covered in blood. You hear, as if from far away, someone say: \"It was suicide.\"\\\\You stop and wonder if there was anything you could have done to prevent it. If somehow, your actions could have kept Ken from taking his own life. But alas, it was finished. Nothing could be done for him now. At least it was a quick and painless death.",
            next: {
                response: "THE END. Try again?",
                next: function () {
                    ss.setItem('ken', 0);
                    ss.setItem('sally', 0);
                    return 0;
                }
            }
        }
    }
}
];