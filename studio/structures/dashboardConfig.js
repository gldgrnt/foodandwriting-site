// Run the instal
// sanity install @sanity/dashboard

// Add following code to sanity.json
// {
//     "implements": "part:@sanity/dashboard/config",
//     "path": "./structures/dashboardConfig.js"
//   }

// export default {
//     widgets: [
//       {
//         name: 'document-list', 
//         options: {
//           title: 'Last edited posts', 
//           order: '_updatedAt desc', 
//           types: ['post']
//         }
//       }
//     ]
//   }