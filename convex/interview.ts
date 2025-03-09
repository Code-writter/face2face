import {mutation, query} from "./_generated/server"
import {v} from 'convex/values'


export const getAllInterviews = query({
    handler: async(ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity) throw new Error("Unauthorized")

        const interviews = await ctx.db.query("interviews").collect()

        return interviews
    }
})

export const getMyInterviews = query({

    handler : async(ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        
        if(!identity) throw new Error("Unauthorized")

        const interviews = await ctx.db.query("interviews")
        .withIndex("by_candidate_id", (q) => q.eq("candidateId", identity.subject)).collect()

        return interviews
    }
})

export const getInterviewByStreamCallId = query({
    args : {streamCallId : v.string()},
    handler: async(ctx, args) => {
        const streamCallInterview = await ctx.db.query("interviews")
        .withIndex("by_stram_call_id", (q) => q.eq("streamCallId", args.streamCallId))
        .first()
        
        return streamCallInterview
    }
})

// To create an interview

export const createInterview = mutation({
    args:{
        title : v.string(),
        description : v.string(),
        startTime : v.number(),
        status : v.string(),
        streamCallId : v.string(),
        candidateId : v.string(),
        interviewerIds : v.array(v.string())
    },

    handler : async(ctx , args) => {
        const identity = await ctx.auth.getUserIdentity()

        if(!identity) throw new Error("Unauthorized")

        return await ctx.db.insert("interviews", {
            ...args
        })

    }
})

// Status updation of interview Call
export const updateInterviewStatus = mutation({
    args:{
        id : v.id("interviews"),
        status : v.string()
    },

    handler: async(ctx, args) => {
        return await ctx.db.patch(args.id, {
            status : args.status,
            ...(args.status === "completed" ? {endTime : Date.now()} : {})
        })
    }
})