// input Types
type promptSubmission = {
    userSubject:string,
    userBody:string,
    exerciseType:string,
    exerciseTo:string,
    exerciseCc:string[],
    exercisePrompt:string,
    exerciseBody:string,
    exerciseSubject:string,
    context:string,
    tutorPrompt:string
}

const babelFishPrompt = 
({context,exerciseBody,exerciseCc,exercisePrompt,exerciseSubject,exerciseTo,exerciseType,tutorPrompt,userBody,userSubject}:promptSubmission) => `

tutorPrompt: ${tutorPrompt}

-----

Exercise Type: ${exerciseType}
Exercise To: ${exerciseTo}
Exercise Cc: ${exerciseCc.join(", ")}
Exercise Subject: ${exerciseSubject}
Exercise Body: ${exerciseBody}
Exercise Prompt: ${exercisePrompt}
Context: ${context}

-----

User Subject: ${userSubject}
User Body: ${userBody}

`

export default babelFishPrompt