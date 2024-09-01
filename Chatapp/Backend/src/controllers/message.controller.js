import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getRecieverSocket, io } from "../socketio/soketio.js";

export const sendMessages = async (req, res) => {
  try {
    const senderId = req.id;
    const recieverId = req.params.id;
    const { message } = req.body;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        // create is use to create a new conversation like we create a user using new keyword same like that
        participants: [senderId, recieverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      recieverId,
      message,
    });

    // if (!newMessage) {
    //   return res.status(400).json({ message: "Message not sent" });
    // }

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
   await conversation.save()

// Socket io code

const recieverSocketId  = getRecieverSocket(recieverId)
if(recieverSocketId){
io.to(recieverSocketId).emit('getMessageWithSocket', newMessage)
  
}


    return res.status(200).json({
      success: true,
      message: "Message sent",
      newMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error in sendMessages controller",
      error,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.id;
    const recieverId = req.params.id;
    console.log(senderId, recieverId)
    const conversation = await Conversation.findOne({
      participants: {$all: [senderId, recieverId] },
    }).populate("messages");
    console.log(conversation.messages);
    return res.status(200).json( conversation?.messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getMessages controller",
      error,
    });
  }
};
