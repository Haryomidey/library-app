const AdminRoutes  ={
    Register : '/card-management/register',
    CompleteProfile : '/card-management/complete-profile',
    Login :'/',
    forgotPassword : '/card-management/forgot-password',
    emailSent :'/card-management/email-sent',
    setPassword :'/card-management/set-password',
    portal : {
        dashboard : '/card-management/admin/dashboard',
        clients : '/card-management/admin/clients',
        roles : '/card-management/admin/roles',
        cards : '/card-management/admin/cards',
        newCard : '/card-management/admin/new-card',
        cardsType : '/card-management/admin/cards-type',
        giftCard : '/card-management/admin/gift-cards',
        cardByBatch : '/card-management/admin/cards/:batch_id/cards-list',
        cardByBatchLink: (batch_id: string) => `/card-management/admin/cards/${batch_id}/cards-list`,
        previewCard : '/card-management/admin/card/:request_id/preview',
        previewCardLink: (request_id: string) => `/card-management/admin/card/${request_id}/preview`,
      
    }
}

export default AdminRoutes;