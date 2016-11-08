file_obj = open('facebook-comments/goal.txt', 'r')
scores = [0] * 44
cohort_names=[
              "neo","shaquille","the father","fantastic 4","view from the 5th",
              "six in the city", "the deadly sins","gr8 m8", "upside-down 6", "Hamil-10",
              "11", "duck", "inferno","cohorton hears a who", "cal-hort",
              "16", "17thirtyeight", "spatulah","33 marks and counting","3/20",
              "21","catch 22","23 jump street","24 jump street","paarti",
              "alphabet","republic of chad","taylor gang","drinks soy milk","savages",
              "31ectric","molar bears","tonioshalal", "wtf", "soaplets",
              "harambae","ebmarah","izzy","game of sloan","40wap",
              "black ballads matter", "and everything else","amysangels","co-fo-fo"
              ]
        
line_count 		= 0
points_given 	= False
cohort_num 		= 0

for line in file_obj:
    line_count += 1
    line = line.lower()
    print(line)
    new_line = line.split()
	  
    if new_line[0] == "like" or new_line[0] == "unlike":
        line_count = 0
        points_given = False
        cohort_number = 0
        print("************************************************************************\n")
        print("************************************************************************\n")
    else:
        if points_given == True:
            if "'s photo" in line:
                scores[cohort_number-1] += 5
                print("******** ADDING 5 BONUS POINTS TO", cohort_number)
        while (points_given == False):         
            for i in range(43,-1, -1):
                cohort_hashtag 		= "cohort" + str(i+1)
                cohort_hashtag_space	= "cohort " + str(i+1)
                if (cohort_hashtag in line) or (cohort_names[i] in line) or (cohort_hashtag_space in line):
                    scores[i] += 10
                    cohort_number = i+1
                    print("******** ADDING 10 POINTS TO", cohort_number)
                    points_given = True
                    break
            break      
for i in range(0,44):
    print(str(scores[i]))
