// import { RoleType } from "@/core/domain/entities/Role";
// import { User } from "@/core/domain/entities/User";
// import { RoleModel, UserModel } from "@/models/user-role-schema";
import { constructEventWebhookUC, retrieveSessionUC } from "@/core/application/usecases/services/pay";
import { checkoutSessionCompletedC, customerSubscriptionDeletedC } from "@/core/interface-adapters/controllers/user";
import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_API_KEY!);
export async function POST(req: NextRequest) {
  const payload = await req.text()
  const sig = req.headers.get("stripe-signature")

  // let event;
  try {
    const event = constructEventWebhookUC(payload, sig!)


    // Handle the event
    switch (event.type) {
      // case 'payment_intent.succeeded':
      //   const paymentIntentSucceeded = event.data.object;
      //   // Then define and call a function to handle the event payment_intent.succeeded
      //   console.log({ paymentIntentSucceeded })
      //   break;
      // ... handle other event types
      case "checkout.session.completed":
        console.log("checkout session triggered")
        const session = await retrieveSessionUC(
          event.data.object.id,
          {
            expand: ["line_items"],
          }
        );
        await checkoutSessionCompletedC(session)
        break;
      case "customer.subscription.deleted":
        const subscriptionId = event.data.object.id;
        console.log("subscriptionId: ", subscriptionId)
        customerSubscriptionDeletedC(subscriptionId)
        break;

      // case "customer.subscription.updated":
      //   console.log("is updating info")
      //   break;
      default:
        console.log(`Unhandled event type ${event.type}`);

    }
    // const event = stripe.webhooks.constructEvent(payload, sig!, process.env.STRIPE_WEBHOOK_KEY!);


    // // Handle the event
    // switch (event.type) {
    //   // case 'payment_intent.succeeded':
    //     // const paymentIntentSucceeded = event.data.object;
    //     // Then define and call a function to handle the event payment_intent.succeeded
    //     // console.log({ paymentIntentSucceeded })
    //     // break;
    //   // ... handle other event types
    //   case "checkout.session.completed":
    //     console.log("checkout session triggered")
    //     const session = await stripe.checkout.sessions.retrieve(
    //       event.data.object.id,
    //       {
    //         expand: ["line_items"],
    //       }
    //     );
    //     // console.log("session", { session })
    //     // console.log("client reference:", session.client_reference_id)
    //     const user: User | null = await UserModel.findById(session.client_reference_id);
    //     // console.log("user: ", user)
    //     if (!user) throw new Error("Error with client_reference_id")
    //     if (!session.metadata || !session.metadata.role) throw new Error("Error at set metadata role")
    //     const role = await RoleModel.findById(user.roleId)

    //     if (user.role === RoleType.STUDENT || user.role === RoleType.STUDENT_PRO) {
    //       const stripeCustomerId = role.stripeCustomerId
    //       // const subscriptionId = role.subscriptionId

    //       console.log("Cancelling previous subscription...");

    //       try {
    //         // Cancel the previous subscription
    //         await stripe.customers.del(stripeCustomerId)
         
    //         console.log("Previous user deleted successfully");
    //       } catch (error) {
    //         console.error("Error cancelling previous subscription:", error);
    //         throw error;
    //       }
    //     }
    //     if (!user.roleId) {
    //       const role = new RoleModel({
    //         address: user.address,
    //         permissions: session.metadata.role,
    //         stripeCustomerId: session.customer,
    //         subscriptionId: session.subscription,
    //         subscriptionStatus: session.status
    //       })
    //       console.log("Role created: ", role)
    //       try {
    //         await role.save()
    //         await UserModel.findByIdAndUpdate(user.id, { roleId: role.id, role: session.metadata.role });
    //       } catch (saveError) {
    //         console.error("Error saving role or updating user:", saveError)
    //         throw saveError
    //       }

    //     } 
    //     else {
    //       //Update: Primero entra aqui
    //       role.stripeCustomerId = session.customer
    //       role.subscriptionId = session.subscription
    //       role.subscriptionStatus = session.status
    //       role.permissions = session.metadata.role
    //       const savedRole = await role.save()
    //       await UserModel.findByIdAndUpdate(user.id, {role: session.metadata.role})
    //       console.log("saved role: ", {savedRole})
          
    //     }
    //     break;
    //   case "customer.subscription.deleted":
    //     const subscriptionId = event.data.object.id;
    //     try {
    //       const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    //       // console.log("subscription: ", { subscription })
    //       const role = await RoleModel.findOneAndDelete({ stripeCustomerId: subscription.customer })
    //       if(!role) break;// 💡 -> Si esta haciendo update el id no coincidirá y no pasara el break ‼️
    //       const user = await UserModel.findOneAndUpdate({ address: role.address }, { role: null, roleId: null })
    //       console.log("updated user: ", { user })
    //       console.log("deleted role: ", { role })
          
    //     } catch (error) {
    //       console.error("Error at handle delete subscription: " , error)
    //     }
    //     console.log("Customer deleted with id: ",)
    //     break;

    //   case "customer.subscription.updated":
    //     console.log("is updating info")
    //     break;
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);

    // }
    return NextResponse.json({
      status: "success",
    });
  } catch (err) {
    return NextResponse.json({ status: "Failed", err });
  }

}