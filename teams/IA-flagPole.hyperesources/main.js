window.mainFunc = function(hypeDocument){

	$('#waffleMenu').hide();
	$('#activity_bubble_heads').hide();

	window.signin = false;
	window.themeColor = 'grey';
	window.leftPanelStatus = 'open';
	var selectedRoomListId;
	var resourceUrl = 'https://uxccds.github.io/Spark-Hype-MVO';
	var waffleMenuBallButtons = ['btn_chat', 'btn_call', 'btn_sch', 'btn_wb', 'btn_files', 'btn_tasks', 'btn_share'];
	var createBallButtons = ['btn_chat', 'btn_call', 'btn_schedule', 'btn_share'];
	var teamColors = ['#D0B5F3', '#8DE3CE', '#F3D58D', '#B1F38D', '#F38D8D', '#8DCBF3', '#F3A48D'];
	var teamColorIndex = 0;
	var space_id_counter = 100;
	var currentSearchValue;
	var inSearchView = false;
	var selectedSearchTab = 'tab_space';
	var searchInputTagList = [];
	var searchInputTagSuffix = '';
	var roomListTopItemsHeight = 0;
	//add swtich call 021518
	var switchCalls = 0; //0 = defualt ; 1 = video ; 2= audio 
	var callConnect = 0; //0 = default; 1 = call connect shown

	var selectedFilterType = undefined;
	var selectedFilterName = undefined;

	var filter_list = [
		//'All',
		'People',
		//'Unread',
		//'Favorites',
		'Mentions',
		'Flags',
		//'Drafts',
	];
	
	var search_tag_list = [
		{
			tag: 'in:',
			des: 'Search inside a certain space',
		},
		{
			tag: 'from:',
			des: 'Search messages from someone',
		},
		{
			tag: 'with:',
			des: 'Find spaces you share with someone',
		},
	]

	var phoneCallHistory = [
		'+1 408-955-0639',
		'+1 408-526-4000'
	]

	var today_date = moment().format('YYYY-MM-DD');
	var yesterday_date = moment(Number(moment().format('x')) - 86400000).format('YYYY-MM-DD');
	var tomorrow_date = moment(Number(moment().format('x')) + 86400000).format('YYYY-MM-DD');
	var scheduled_time1 = moment(tomorrow_date + ' 13:00');
	var scheduled_time2 = moment(tomorrow_date + ' 14:00');

	var FTEstarted = false;
	var FTEcompleted = false;
	var FTEdone_space = true;
	var FTEdone_todaysMeeting = true;
	var FTEdone_searchAndFilter = false;

	var in_share = false;
	var others_is_sharing = false;
	var audio_type = 'pc';


	// -----------------------------------
	//             PEOPLE LIST
	// -----------------------------------

	var people_list = {
		'Barbara German': {
			'avatar': 'Avatar_Barbara_German.png',
			'gif': 'Avatar_Barbara_German.png',
			'email': 'barbara_german@ikea.com',
		},
		'Brandon Smith': {
			'avatar': 'Avatar__Brandon.jpg',
			'gif': 'Avatar__Brandon_gif.gif',
			'email': 'brandon_smith@ikea.com',
		},
		'Emma Hirst': {
			'avatar': 'Avatar__Emma.jpg',
			'gif': 'Avatar__Emma_gif.gif',
			'email': 'emma_hirst@ikea.com',
		},
		'George Edwards': {
			'avatar': 'Avatar__George.jpg',
			'gif': 'Avatar__George_gif.gif',
			'email': 'eeorge_edwards@ikea.com',
		},
		'Simon Damiano': {
			'avatar': 'Avatar_Adrian_Delamico.png',
			'gif': 'Avatar_Adrian_Delamico.png',
			'email': 'simon_damiano@ikea.com',
		},
		'Linda Sinu': {
			'avatar': 'Avatar__Linda.jpg',
			'gif': 'Avatar__Linda.jpg',
			'email': 'linda_sinu@ikea.com',
		},
		'Liam McDonald': {
			'avatar': 'Avatar__Liam.png',
			'gif': 'Avatar__Liam.png',
			'email': 'liam_mcdonald@ikea.com',
		},
		'Lily Adams': {
			'avatar': 'Avatar__Lily.png',
			'gif': 'Avatar__Lily.png',
			'email': 'lily_adams@ikea.com',
		},
	};
	var self_name = 'Barbara German';


	// -----------------------------------
	//             TEAM LIST
	// -----------------------------------
	var team_list = [];

	var team_list_all = [
		{
			name: 'Sales and Marketing',
			spaces: [
				'General',
				'Marketing',
				'Branding',
				'Print Ad/Material',
				'Web Content',
				'Campaign Management',
				'Marketing Staff',
			]
		},
		{
			name: 'Android UX',
			spaces: [
				'General',
				'NIA',
				'App IA - Follow Me Home',
				'IA Desktop Feedback',
				'IA Desktop Scrum',
				'IA Mobile Feedback',
				'IA Mbile Scrum',
				
			]
		},
		{
			name: 'Organizational News',
			spaces: [
				'General',
				'Monthly Update',
				'Roadmap 2017',
				'Open questions',
				'Events (Internal)',
				'Volunteering Opportunities',
				'Suggestions',
				
			]
		},
		{
			name: 'Design',
			spaces: [
				'General',
				'Future Designs',
				'Anything possible',
				'Ideas anyone?',
				'Branstorming',
				'Bug Report',
				'Open Work List',
				
			]
		},
		{
			name: 'iOS UX',
			spaces: [
				'General',
				'New in iOS',
				'Bugs',
				'Help Desk',
				'Weekly Updates',
			]
		},
		{
			name: 'Marketing Analysis',
			spaces: [
				'General',
				'Market Trends',
				'Competitive Analysis',
				'New products',				
			]
		},
		{
			name: 'UX Internal',
			spaces: [
				'General',
				'New Stuff Coming',
				'User Feedback',
				'User Testing Updates',
				'Ask any questions here',
				'Friday Lunch',
				'Mobile Daily Scrum',
				'Desktop Daily Scrum',
				'Leads',
			]
		},
		{
			name: 'Tablet UX',
			spaces: [
				'General',
				'Coming Next',
				'Ideas?',
				'Visual Updates',
			
			]
		},
		{
			name: 'New IA Design',
			spaces: [
				'General',
				'Round Table Discussion',
				'Plan and Materials',				
			]
		},
		{
			name: 'Design Studio',
			spaces: [
				'General',
				'Photoshop',
				'Design Staff',
				'Announcements',
			]
		},
		{
			name: 'Internal Testing',
			spaces: [
				'General',
				'Testing and Result sharing',
				
			]
		}
	];

	for(var i=0; i<team_list_all.length; i++){
		var team = team_list_all[i];
		color = teamColors[teamColorIndex];
		team.color = color;
		if(teamColorIndex < teamColors.length-1){
			teamColorIndex++;
		}else{
			teamColorIndex = 0;
		}
	}

	team_list = team_list_all.slice();

	
	
	// -----------------------------------
	//             ROOM LIST
	// -----------------------------------

	var room_list_all = [
		{
			id: 0,
			name: "Brandon Smith",
			type: "people",
			mention: 0,
			draft: false,
			defaultPanel: 'chat',
			people: [
				'Brandon Smith',
			],
			fileList: [
				{
					'name': 'Budget.ppt',
					'sub': 'Barbara German, 6 days',
					'img': 'file_003.png',
				}
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [
				{
					name: 'Brandon Smith',
					time: '12:51',
					msg: 'Do you know who I should talk to in Engineering regarding the list issue?'
				},
				{
					name: 'You',
					time: '12:53',
					msg: 'Hmmmm...not quite sure about this. Let me check for you, once sec.'
				},
				{
					name: 'Brandon Smith',
					time: '1:03',
					unread: true,
					msg: 'Thanks!'
				},
			],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},
		{
			id:1,
			name: "Marketing",
			team: "Sales and Marketing",
			type: "space",
			mention: 0,
			draft: false,
			defaultPanel: 'chat',
			people: [
				'Brandon Smith',
				'George Edwards',
				'Emma Hirst',
			],
			fileList: [
				{
					'name': 'Maps.key',
					'sub': 'Anna Simmons, 3 days',
					'img': 'file_001.png',
				},
				{
					'name': 'Logo.pdf',
					'sub': 'Barbara German, 6 days',
					'img': 'file_002.png',
				},
				{
					'name': 'Budget.ppt',
					'sub': 'Barbara German, 6 days',
					'img': 'file_003.png',
				},
				{
					'name': 'Ideas.pdf',
					'sub': 'Anna Simmons, 9 days',
					'img': 'file_004.png',
				},
			],
			whiteboardList: [
				{
					'time': 'Last active now',
					'img': 'wb_001.png',
				},
				{
					'time': 'Last active today, 13:36',
					'img': 'wb_002.png',
				},
				{
					'time': 'Last active yesterday',
					'img': 'wb_003.png',
				},
				{
					'time': 'Last active Tuesday',
					'img': 'wb_004.png',
				},
			],
			meetingList: [
				{
					title: 'Budget Planning',
					time: today_date+' 16:00,'+today_date+' 17:00',
					host: 'Brandon Smith',
					des: 'In this meeting, Brandon and Maria are going to share some data about Spark with us. Hopefully we can start using both quantitative and qualitative data to create a better experience for Spark users. <br><br>Agenda:<br>1.  Team Space feedback - All (5 mins)<br>2.  Org change - Giacomo (10 mins)<br>3.  Design Brief - All (10 mins)<br>4.  Budgets - Melania (5 mins)',
					people: [
						'Brandon Smith',
						'Emma Hirst',
						'George Edwards',
						'Barbara German'
					],
				}
			],
			taskList: [
				{
					title: 'Get updated on competitor Zara Home',
					time: 'Tomorrow',
					type: 'Sourcing',
					people: 'Emma Hirst',
					checked: false
				},
				{
					title: 'New Ikea website launch plan',
					time: 'Fri 27, 2017',
					type: 'Prototyping',
					people: 'Brandon Smith',
					checked: false
				},
				{
					title: 'Prepare the Ikea concept presentation',
					time: '',
					type: 'Marketing',
					people: 'George Edwards',
					checked: true
				},
				{
					title: 'Ikea offer 2017 review',
					time: '',
					type: 'Finance',
					people: 'Brandon Smith',
					checked: true
				},
				
			],
			chatMsg: [
				{
					type: 'splitter',
					msg: 'Brandon added Barbara to this space &nbsp;&nbsp;&nbsp; Tuesday, 7:24 AM'
				},
				{
					name: 'Brandon Smith',
					time: 'Yesterday, 12:44',
					unread: true,
					msg: 'Just a heads up to everyone, the new roadmap for the upcoming quarter will be out soon',
				},
				{
					name: 'Emma Hirst',
					time: 'Yesterday, 13:02',
					unread: true,
					msg: 'For those who would like to review this quarter’s roadmap:<br><a href="#">https://www.ikea.com/t/roadmapQ117</a>'
				},
				{
					name: 'Brandon Smith',
					time: 'Yesterday, 13:04',
					unread: true,
					msg: 'Thanks <span class="color_mention_other">Emma</span> for chiming in!'
				},
				{
					name: 'George Edwards',
					time: 'Yesterday, 13:32',
					unread: true,
					msg: 'Great, this will give us a good sense of what’s coming next!'
				},
				{
					name: 'George Edwards',
					time: 'Yesterdy, 14:36',
					unread: true,
					msg: 'Thanks <span class="color_mention_other">Emma</span> and <span class="color_mention_other">Brandon</span>. Keeps up the good work!',				},
			],
			interstitialPage: {
				meetingTitle:"Budget Planning",
				meetingTime:"1:00 PM - 2:00 PM",
			},
		},
		{
			id: 2,
			name: "Prospects",
			type: "space",
			mention: 1,
			draft: false,
			defaultPanel: 'chat',
			people: [
				'Brandon Smith',
				'Emma Hirst',
			],
			fileList: [
				{
					'name': 'Estimation.pdf',
					'sub': 'Anna Simmons, 3 days',
					'img': 'file_006.png',
				},
				{
					'name': 'Plan.pdf',
					'sub': 'Barbara German, 6 days',
					'img': 'file_007.png',
				},

			],
			whiteboardList: [
				{
					'time': 'Last active today, 13:36',
					'img': 'wb_002.png',
				},
				{
					'time': 'Last active yesterday',
					'img': 'wb_003.png',
				},
				{
					'time': 'Last active Tuesday',
					'img': 'wb_004.png',
				},
			],
			meetingList: [
				
			],
			taskList: [
				{
					title: 'New Ikea website launch plan',
					time: 'Fri 27, 2017',
					type: 'Prototyping',
					people: 'Brandon Smith',
					checked: false
				},
				{
					title: 'Prepare the Ikea concept presentation',
					time: '',
					type: 'Marketing',
					people: 'George Edwards',
					checked: true
				},

			],
			chatMsg: [
				{
					name: 'Brandon Smith',
					time: 'Yesterday, 15:31',
					unread: true,
					msg: '<span class="color_mention_me">Barbara</span> Have you heard anything from the Engineering team yet?'
				},
				{
					name: 'You',
					time: 'Yesterday, 15:35',
					msg: 'Just talked to them about an hour ago, at this point nothing has changed.'
				},
				{
					name: 'Brandon Smith',
					time: '10:48',
					msg: 'Okay. I got more to put in to the specs, do you think we can still make some changes?'
				},
				{
					name: 'You',
					time: '12:32',
					msg: 'Send them my way, let me see how much I can do :)'
				},
				{
					name: 'Brandon Smith',
					time: '12:36',
					unread: true,
					msg: 'Thanks <span class="color_mention_me">Barbara</span>! Sounds good to me!'				},
			],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},
		{
			id: 3,
			name: "Branding",
			team: "Sales and Marketing",
			type: "space",
			mention: 0, // 0 no mention, 1 mention unread, 2 mention read
			draft: false,
			defaultPanel: 'chat',
			people: [
				'Emma Hirst',
				'George Edwards',
			],
			fileList: [
				{
					'name': 'Brand sample.png',
					'sub': 'Anna Simmons, 3 days',
					'img': 'file_005.jpg',
				},
				{
					'name': 'CI',
					'sub': 'Barbara German, 6 days',
					'img': 'file_008.jpg',
				},

			],
			whiteboardList: [
				{
					'time': 'Last active yesterday',
					'img': 'wb_003.png',
				},
				{
					'time': 'Last active Tuesday',
					'img': 'wb_004.png',
				},
			],
			meetingList: [
				{
					title: 'Annual Review',
					time: yesterday_date+' 13:00,'+yesterday_date+' 14:00',
					host: 'George Edwards',
					des: '',
					people: [
						'Emma Hirst',
						'George Edwards',
						'Barbara German'
					],
				}
			],
			taskList: [
				{
					title: 'Ikea offer 2017 review',
					time: '',
					type: 'Finance',
					people: 'Brandon Smith',
					checked: true
				},
			],
			chatMsg: [
				{
					name: 'George Edwards',
					time: '9:51',
					msg: 'Hi guys, we got the new style guides and there are a few things to change',
					flag: true,
					flagtime: '11:30'
				},
				{
					name: 'Emma Hirst',
					time: '10:20',
					msg: 'Send them over'
				},
				{
					name: 'George Edwards',
					time: '10:20',
					msg: 'Sure, I will upload to Spark and the depository. I gathered feedback from everyone else also, so I think it makes more sense when I get that into good list of things that we want to improve on.'
				},
				{
					name: 'You',
					time: '10:25',
					msg: 'That’s awesome!'
				},
				{
					name: 'Emma Hirst',
					time: '10:37',
					msg: 'Great <span class="color_mention_other">George</span>. We’ve been working on the new branding guidelines for a while now. It’s great that we can now start to impeliment the changes! We will work on the prototypes based on the the new guidelines and pass to the Engineering team once we’re done.'
				},
			],
			interstitialPage: {
				meetingTitle:"Annual Review",
				meetingTime:"1:00 PM - 2:00 PM",
			},
		},
		{
			id: 4,
			name: "Brandon & Emma",
			type: "space",
			mention: 0,
			draft: true,
			defaultPanel: 'chat',
			people: [
				'Brandon Smith',
				'Emma Hirst',
			],
			fileList: [
			
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [
				{
					name: 'You',
					time: 'Yesterday, 10:43',
		    		msg: 'Would you guys like pizza?'
	    		},
	    		{
					name: 'Brandon Smith',
					time: 'Yesterday, 10:44',
					msg: 'Great!'
				},
				{
					name: 'Emma Hirst',
					time: 'Yesterday, 10:44',
					msg: 'Sounds good!'
				}
			],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},
		{
			id: 5,
			name: "Simon Damiano",
			type: "people",
			mention: 0,
			draft: false,
			defaultPanel: 'files',
			people: [
				'Simon Damiano',
			],
			fileList: [
				{
					'name': 'New_Layout.png',
					'sub': 'Simon Damiano, 2 days',
					'img': 'file_009.jpg',
				}
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [
				{
					name: 'Simon Damiano',
					time: '10:20',
					msg: 'Do you have lunch plans for today?'
				},
			],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},
		{
			id: 6,
			name: "Brandon, Emma, Simon",
			type: "space",
			mention: 0,
			draft: false,
			defaultPanel: 'chat',
			people: [
				'Brandon Smith',
				'Emma Hirst',
				'Simon Damiano',
			],
			fileList: [
				
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [
				{
					name: 'Brandon Smith',
					time: 'Yesterday, 15:31',
					msg: 'Have you heard anything from the Engineering team yet?',
					flag: true,
					flagtime: '18:20'
				},
			],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},
		{
			id: 7,
			name: "Linda Sinu",
			type: "people",
			mention: 0,
			draft: false,
			defaultPanel: null,
			people: [
				'Linda Sinu',
			],
			fileList: [
				
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},
		{
			id: 8,
			name: "Print Ad/Material",
			team: "Sales and Marketing",
			type: "space",
			mention: 0,
			draft: false,
			defaultPanel: null,
			people: [
				'Brandon Smith',
				'Emma Hirst',
				'Simon Damiano',
			],
			fileList: [
				
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},
		{
			id: 9,
			name: "Web Content",
			team: "Sales and Marketing",
			type: "space",
			mention: 0,
			draft: false,
			defaultPanel: null,
			people: [
				'Brandon Smith',
				'Emma Hirst',
				'Simon Damiano',
			],
			fileList: [
				
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},
		{
			id: 10,
			name: "Campaign Management",
			team: "Sales and Marketing",
			type: "space",
			mention: 0,
			draft: false,
			defaultPanel: null,
			people: [
				'Brandon Smith',
				'Emma Hirst',
				'Simon Damiano',
			],
			fileList: [
				
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},
		{
			id: 11,
			name: "Marketing Staff",
			team: "Sales and Marketing",
			type: "space",
			mention: 0,
			draft: false,
			defaultPanel: null,
			people: [
				'Brandon Smith',
				'Emma Hirst',
				'Simon Damiano',
			],
			fileList: [
				
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},
		{
			id: 12,
			name: "Photoshop",
			team: "Design Studio",
			type: "space",
			mention: 0,
			draft: false,
			defaultPanel: 'chat',
			people: [
				'Lily Adams',
				'Liam McDonald',
				'Simon Damiano',
			],
			fileList: [
				
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [
				{
					name: 'Liam McDonald',
					time: 'Yesterday, 10:43',
		    		msg: 'Just saw the upcoming Photohop features from Adobe Max, very excited about it!'
	    		},
	    		{
					name: 'Lily Adams',
					time: 'Yesterday, 10:44',
					msg: 'Awesome, were you at the event? or did you watch it online?'
				},
				{
					name: 'Liam McDonald',
					time: 'Yesterday, 10:44',
					msg: 'Was there in Vegas earlier this year. You can also check out the Adobe Max website for the recordings too.'
				}
			],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},
		{
			id: 13,
			name: "General",
			team: "Organizational News",
			type: "space",
			mention: 0,
			draft: false,
			defaultPanel: null,
			people: [
				'Brandon Smith',
				'Emma Hirst',
				'Simon Damiano',
				'Liam McDonald',
				'Lily Adams',
			],
			fileList: [
				
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [
				
			],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},
		{
			id: 14,
			name: "General",
			team: "Tablet UX",
			type: "space",
			mention: 0,
			draft: false,
			defaultPanel: null,
			people: [
				'Brandon Smith',
				'Emma Hirst',
				'Simon Damiano',
				'Liam McDonald',
				'Lily Adams',
			],
			fileList: [
				
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [
				
			],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},
		{
			id: 15,
			name: "General",
			team: "Marketing Analysis",
			type: "space",
			mention: 0,
			draft: false,
			defaultPanel: null,
			people: [
				'Brandon Smith',
				'Emma Hirst',
				'Simon Damiano',
				'Liam McDonald',
				'Lily Adams',
			],
			fileList: [
				
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [
				
			],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},
		{
			id: 16,
			name: "General",
			team: "Internal Testing",
			type: "space",
			mention: 0,
			draft: false,
			defaultPanel: null,
			people: [
				'Brandon Smith',
				'Emma Hirst',
				'Simon Damiano',
				'Liam McDonald',
				'Lily Adams',
			],
			fileList: [
				
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [
				
			],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},{
			id: 17,
			name: "General",
			team: "Design Studio",
			type: "space",
			mention: 0,
			draft: false,
			defaultPanel: 'chat',
			people: [
				'Brandon Smith',
				'Emma Hirst',
				'Simon Damiano',
				'Liam McDonald',
				'Lily Adams',
			],
			fileList: [
				
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [
				{
					name: 'Emma Hirst',
					time: 'Yesterday, 11:43',
		    		msg: 'Does anyone know when the design conference is scheduled?'
	    		},
	    		{
					name: 'Brandon Smith',
					time: 'Yesterday, 11:44',
					msg: 'Not me, wondering too.'
				},
				{
					name: 'Emma Hirst',
					time: 'Yesterday, 11:44',
					msg: 'Would be great if someone could shed some light on this.'
				}
			],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},{
			id: 18,
			name: "General",
			team: "Sales and Marketing",
			type: "space",
			mention: 0,
			draft: false,
			defaultPanel: 'chat',
			people: [
				'Brandon Smith',
				'Emma Hirst',
				'Simon Damiano',
				'Liam McDonald',
				'Lily Adams',
			],
			fileList: [
				
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [
				{
					name: 'Emma Hirst',
					time: 'Yesterday, 11:43',
		    		msg: 'Does anyone know when the design conference is scheduled?'
	    		},
	    		{
					name: 'Brandon Smith',
					time: 'Yesterday, 11:44',
					msg: 'Not me, wondering too.'
				},
				{
					name: 'Emma Hirst',
					time: 'Yesterday, 11:44',
					msg: 'Would be great if someone could shed some light on this.'
				}
			],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		},{
			id: 19,
			name: "General",
			team: "Design Studio",
			type: "space",
			mention: 0,
			draft: false,
			defaultPanel: 'chat',
			people: [
				'Brandon Smith',
				'Emma Hirst',
				'Simon Damiano',
				'Liam McDonald',
				'Lily Adams',
			],
			fileList: [
				
			],
			whiteboardList: [
			
			],
			meetingList: [
			
			],
			taskList: [
			
			],
			chatMsg: [
				{
					name: 'Emma Hirst',
					time: 'Yesterday, 11:43',
		    		msg: 'Does anyone know when the design conference is scheduled?'
	    		},
	    		{
					name: 'Brandon Smith',
					time: 'Yesterday, 11:44',
					msg: 'Not me, wondering too.'
				},
				{
					name: 'Emma Hirst',
					time: 'Yesterday, 11:44',
					msg: 'Would be great if someone could shed some light on this.'
				}
			],
			interstitialPage: {
				meetingTitle:"",
				meetingTime:"",
			},
		}

		
	];


	for(var pp in people_list){
		if(pp == self_name){
			continue;
		}
		var found = false;
		for(var i=room_list_all.length-1; i>=0; i--){
			var itm = room_list_all[i];
			if(itm.name == pp){
				found = true;
				break;
			}
		}
		if(found){
			continue;
		}
		createNewSpace('people', pp, [pp]);

	}


	var room_list = [];

	var room_list_day1 = [1];
	var room_list_day2 = [
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		12,
		13,
		14,
		15,
		16,
		18,
		19,
	];


	function getSpaceList(idlist){
		var list = [];
		var len = idlist.length;
		for(var j=0; j<len; j++){
			var id = idlist[j];
			for(var i=room_list_all.length-1; i>=0; i--){
				var itm = room_list_all[i];
				if(itm.id == id){
					list.push(itm);
				}
			}
		}
		return list;
	}


	
	
	// button action
	$('#button_leftpanel .btn').on('click', function(evt){
		evt.stopPropagation();
	
		if(window.leftPanelStatus == 'open'){
		
			closeLeftPanel()
			
		}else if(window.leftPanelStatus == 'closed'){
		
			openLeftPanel()
			
		}
	});

 	
	$('.activityNameBallButton').on('click', function(evt){
		evt.stopPropagation();
		
		if(!$('#waffleMenu').is(':visible')){
			showWaffleMenu(false, false);
			
		}else{
			dismissWaffleMenu();
		}

		
	});


	$('#spaceSettings').hide();
	$('#waffleMenu .ico_setting').on('click', function(evt){
		evt.stopPropagation();
		showSpaceSettings();
	});
	$('#spaceSettings .close').on('click', function(evt){
		evt.stopPropagation();
		$('#spaceSettings').hide();
	});

	$('#spaceSettings .btn_pin').on('click', function(evt){
		evt.stopPropagation();
		
		var pin = getSpaceAttr(selectedRoomListId, 'pin');
		if(pin > 0){
    		setSpaceAttr(selectedRoomListId, 'pin', 0);

    		$('#spaceSettings .btn_pin').removeClass('on');
			$('#spaceSettings .btn_pin .lb').text('Pin to top');
    	}else{
    		setSpaceAttr(selectedRoomListId, 'pin', pin_counter);
    		pin_counter++;

    		$('#spaceSettings .btn_pin').addClass('on');
			$('#spaceSettings .btn_pin .lb').text('Unpin from top');
    	}
		sortRoomListItem();

	});
	$('#spaceSettings .btn_mute').on('click', function(evt){
		evt.stopPropagation();
		
		var mute = getSpaceAttr(selectedRoomListId, 'muted');
    	if(mute > 0){
    		setSpaceAttr(selectedRoomListId, 'muted', 0);
    		$('#room-'+selectedRoomListId+' .ico_muted').hide();

    		$('#spaceSettings .btn_mute').removeClass('on');
			$('#spaceSettings .btn_mute .lb').text('Mute');

			showMuteOptions(false, true);

    	}else{
    		setSpaceAttr(selectedRoomListId, 'muted', 1);
    		$('#room-'+selectedRoomListId+' .ico_muted').show();

    		$('#spaceSettings .btn_mute').addClass('on');
			$('#spaceSettings .btn_mute .lb').text('Unmute');

			showMuteOptions(true, true);
    	}

	});


	function showMuteOptions(show, animated){
		var h = 72;
		var dur = animated ? 300 : 0;

		if($('#spaceSettings .memberNum').attr('oriy') == undefined){
			$('#spaceSettings .memberNum').attr( 'oriy', $('#spaceSettings .memberNum').css('top').split('px')[0] );
		}
		if($('#spaceSettings .plist').attr('oriy') == undefined){
			$('#spaceSettings .plist').attr( 'oriy', $('#spaceSettings .plist').css('top').split('px')[0] );
			$('#spaceSettings .plist').attr( 'orih', $('#spaceSettings .plist').height() );
		}

		if(show){
			$('#spaceSettings .mute_selected').show();

			$('#spaceSettings .mute_options').animate({
				height: h
				},
				dur
			);
			$('#spaceSettings .memberNum').animate({
				top: Number($('#spaceSettings .memberNum').attr('oriy'))+h
				},
				dur
			);
			$('#spaceSettings .plist').delay(10).animate({
				top: Number($('#spaceSettings .plist').attr('oriy'))+h,
				height: Number($('#spaceSettings .plist').attr('orih'))-h
				},
				dur,
				function(){
					$('#spaceSettings .plist').getNiceScroll(0).resize();
				}
			);

		}else{
			$('#spaceSettings .mute_selected').hide();

			$('#spaceSettings .mute_options').animate({
				height: 0
				},
				dur
			);
			$('#spaceSettings .memberNum').animate({
				top: Number($('#spaceSettings .memberNum').attr('oriy'))
				},
				dur
			);
			$('#spaceSettings .plist').delay(10).animate({
				top: Number($('#spaceSettings .plist').attr('oriy')),
				height: Number($('#spaceSettings .plist').attr('orih'))
				},
				dur,
				function(){
					$('#spaceSettings .plist').getNiceScroll(0).resize();
				}
			);

			
		}

		

	}


	function showSpaceSettings(){
		var len = room_list.length;
		for(var i=0; i<len; i++){
			var room = room_list[i];
			var name = room.name;
			var pin = room.pin;
			var muted = room.muted;

			if(room.id == selectedRoomListId){
				$('#spaceSettings .name').text(name);
				$('#spaceSettings .avatar-letter').text(room.name[0].toUpperCase());

				// pin
				if(pin){
					$('#spaceSettings .btn_pin').addClass('on');
					$('#spaceSettings .btn_pin .lb').text('Unpin from top');
				}else{
					$('#spaceSettings .btn_pin').removeClass('on');
					$('#spaceSettings .btn_pin .lb').text('Pin to top');
				}

				// avatar
				var people = people_list[name];
				if(people != undefined && people.avatar.length > 0){
					$('#spaceSettings .ava-img').css( 'background-image', 'url(' + hypeDocument.resourcesFolderURL() + '/' + people.avatar + ')' );
					$('#spaceSettings .ava-img').show();
					$('#spaceSettings .avatar').css('background-color', 'rgba(0,0,0,0)');
				}else{
					$('#spaceSettings .ava-img').hide();
				}

				// space color
				$('#spaceSettings .team').html('');

				if(room.team){

					for(var s = team_list_all.length-1; s>=0; s--){
						var team = team_list_all[s];
						var color = team.color;
						var s_name = team.name;
						if(s_name == room.team){
							$('#spaceSettings .team').html(room.team);
							// set space color
							$('#spaceSettings .team').css('color', color);
							$('#spaceSettings .avatar').css('background-color', color);
							break;
						}
					}

					
				}

				//people
				$('#spaceSettings .plist .commonlist').remove();

				var html = '';
				var listhtml = '';

				// add people
				var selfinfo = people_list[self_name];				
				listhtml += '<div class="listitem " >';
				listhtml += '<div class="avatar" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/ico_plus_blue.svg"></div>';
				listhtml += '<div class="label">Add people</div>';
				listhtml += '</div>';

				// self
				var people = room.people;
				var selfinfo = people_list[self_name];				
				listhtml += '<div class="listitem " >';
				listhtml += '<div class="avatar" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + selfinfo.avatar + '"></div>';
				listhtml += '<div class="label_line1">' + self_name + '</div>';
				listhtml += '<div class="label_line2">Active</div>';
				listhtml += '</div>';

				// others
				for(var j=0; j<people.length; j++){
					var pname = people[j];
					var p = people_list[pname];
					var status = Math.random() > 0.5 ? 'Active' : 'Active 25 mins ago';
					listhtml += '<div class="listitem " >';
					listhtml += '<div class="avatar" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + p.avatar + '"></div>';
					listhtml += '<div class="label_line1">' + pname + '</div>';
					listhtml += '<div class="label_line2">'+status+'</div>';
					listhtml += '</div>';
				}

				html += '<div class="commonlist" style="position:absolute; width:408px; top:0px; left:12px; ">'
				html += listhtml;
				html += '</div>';

				$('#spaceSettings .memberNum').text((people.length + 1) + ' members');

				$('#spaceSettings .plist').append($(html));

				// set room list scrollbar style
				$('#spaceSettings .plist').niceScroll({
			        	cursorwidth: "7px",
			        	cursorcolor:"rgba(0,0,0,0.5)",
			        	cursorborder:"2px solid rgba(255,255,255,0)"
			    	});

				$('#spaceSettings .plist').getNiceScroll(0).resize();



				// mute
				if(muted){
					$('#spaceSettings .btn_mute').addClass('on');
					$('#spaceSettings .btn_mute .lb').text('Unmute');
					showMuteOptions(true, false);
				}else{
					$('#spaceSettings .btn_mute').removeClass('on');
					$('#spaceSettings .btn_mute .lb').text('Mute');
					showMuteOptions(false, false);
				}


				break;
			}
		}

		$('#spaceSettings').show();
	}
	


	function setWaffleMenuBubbleHeads(){
		// bubble heads
		var headw;
		var headh;
		headh = 32;

		var len = room_list.length;
		for(var i=0; i<len; i++){
			var itm = room_list[i];
			if(itm.id == selectedRoomListId){

				var people = room_list[i].people;
				var nump = people.length;
				var html = '';

				headw = headh;

				var selfinfo = people_list[self_name];
				var name = self_name;
				var img = selfinfo.avatar;
				
				html += '<div class="bubbleHeadWaffle" style="width:'+headw+'px; height:'+headh+'px; " tooltip="'+name+'">';
				html += '<div class="avatarImage" style="pointer-events:none; width:'+headw+'px; height:'+headh+'px; border-radius:'+(headh/2)+'px; overflow:hidden; background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + img + '); ">';
				html += '</div>';
				html += '</div>';

				for(var j=0; j<nump; j++){

					var name = people[j];
					var pdat = people_list[name];
					var img = pdat.avatar;
					
					html += '<div class="bubbleHeadWaffle" style="width:'+headw+'px; height:'+headh+'px; " tooltip="'+name+'">';
					html += '<div class="avatarImage" style="pointer-events:none; width:'+headw+'px; height:'+headh+'px; border-radius:'+(headh/2)+'px; overflow:hidden; background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + img + '); ">';
					html += '</div>';
					html += '</div>';
				}
				$('#waffle_plist').html(html);

				regTooltip($('#waffle_plist .bubbleHeadWaffle'), 'down');

				break;
			}
		}
	}

	function showWaffleMenu(noTrans, noActivitySelected){


		$('#waffleMenu .o').removeClass('show');

		if(!noTrans){
			$('#waffleMenu').fadeIn();

			var len = waffleMenuBallButtons.length;
			for(var i=0; i<len; i++){
				var ball = $('#waffleMenu .'+waffleMenuBallButtons[i]);
				
				if(ball.attr('ori-top') == undefined){
					ball.attr('ori-top', ball.css('top'));
					ball.attr('ori-left', ball.css('left'));
				}

				var top = -70;
				var left = $('#waffleMenu .btns').width()/2 - 50;
				ball.css('top', top+'px');
				ball.css('left', left+'px');

				ball.stop().delay(100).animate({
					top: ball.attr('ori-top'),
					left: ball.attr('ori-left')
					},
					400, 
					function() {
						$(this).find('.lb').fadeIn();
						$(this).find('.ico_new').css('opacity', 1);
						//$(this).find('.selected').css('opacity', 1);
					}
				);
				

				ball.find('.lb').hide();
				ball.find('.ico_new').css('opacity', 0);
				ball.find('.selected').css('opacity', 0);
				setTimeout(function(ball){
					ball.find('.o').css('animation-duration', randomNumRange(500,700)+'ms');
					ball.find('.o').addClass('show');
					
				}, randomNumRange(100,120), ball);

				
			}
		}else{

			var len = waffleMenuBallButtons.length;
			for(var i=0; i<len; i++){
				var ball = $('#waffleMenu .'+waffleMenuBallButtons[i]);
				
				if(ball.attr('ori-top') == undefined){
					ball.attr('ori-top', ball.css('top'));
					ball.attr('ori-left', ball.css('left'));
				}
				ball.css('top', ball.attr('ori-top'));
				ball.css('left', ball.attr('ori-left'));
			}

			$('#waffleMenu').show();
			$('#waffleMenu .o').css('animation-duration', '0ms');
			$('#waffleMenu .o').addClass('show');
			$('#waffleMenu .o .lb').show();
			$('#waffleMenu .o .ico_new').css('opacity', 1);
		}


		// blur background
		if(currentVisibleActPanel){
			currentVisibleActPanel.addClass('blurBackground');
		}
		$('#activity_bubble_heads').addClass('blurBackground');


		$('#right-panel-title div').css('color', '#444');
		$('#right-panel-title .arrow').css('transform', 'rotate(180deg)');

		$('#right-panel-title .icon svg .fill').css('fill', '#444');

		if(noActivitySelected){
			$('.activityNameBallButton').css('pointer-events', 'none');
			$('#right-panel-title .arrow').hide();
			$('#right-panel-title .icon').hide();

			$('#waffleMenu').css({'background-color': 'rgba(255, 255, 255, 1)'}); 

		}else{
			$('#waffleMenu').css({'background-color': 'rgba(255, 255, 255, 0.7)'}); 
		}
		
	}
	function dismissWaffleMenu(){
		$('.activityNameBallButton').css('pointer-events', 'auto');
		$('#right-panel-title .arrow').show();
		$('#right-panel-title .icon').show();


		$('#waffleMenu').removeClass('show');
		$('#waffleMenu .ball .o').removeClass('show');

		$('#waffleMenu').fadeOut(700);

		var len = waffleMenuBallButtons.length;
		for(var i=0; i<len; i++){
			var ball = $('#waffleMenu .'+waffleMenuBallButtons[i]);
			
			if(ball.attr('ori-top') == undefined){
				ball.attr('ori-top', ball.css('top'));
				ball.attr('ori-left', ball.css('left'));
			}

			var top = -70;
			var left = $('#waffleMenu .btns').width()/2 - 50;

			ball.stop().animate({
				top: top+'px',
				left: left+'px'
				},
				400, 
				function() {
				}
			);

			ball.find('.lb').hide();
			ball.find('.ico_new').css('opacity', 0);
			ball.find('.selected').css('opacity', 0);

		}

		// remove blur background
		$('.actPanel').removeClass('blurBackground');
		$('#activity_bubble_heads').removeClass('blurBackground');


		if(window.themeColor == 'white'){
			$('#right-panel-title div').css('color', '#FFF');
		}

		$('#right-panel-title .arrow').css('transform', 'rotate(0deg)');

	}


	function shrinkSpaceTitle(){
		/*
		$('#right-panel-title').css('transform', 'scale(0.8)');

		$('#right-panel-title').css('top', '2px');
		*/

		slideDownPanelContent()
	}

	function restoreSpaceTitle(){
		/*
		$('#right-panel-title').css('transform', 'scale(1)');

		$('#right-panel-title').css('top', '16px');
		*/

		slideUpPanelContent()
	}


		
	$('#btn_left_panel_add').on('click', function(evt){
		evt.stopPropagation();

		if(!$('#create_menu').is(':visible')){
			var elemL = $(this).offset().left;
			var deskL = $('#desktop').offset().left;
			var left = elemL - deskL + $(this).width()/2 - $('#create_menu').width()/2;
			$('#create_menu').css('left', left);

			$('#create_menu').fadeIn();
			$('#btn_left_panel_add').attr('tooltip', 'New message or meeting');
			regTooltip($('#btn_left_panel_add'), 'down');

		}else{
			$('#create_menu').fadeOut(100);
			$('#btn_left_panel_add').attr('tooltip', 'New message or meeting');
			regTooltip($('#btn_left_panel_add'), 'up');
		}
		
	});

	
	
	$('.close_create_flow').on('click', function(evt){
		evt.stopPropagation();
		
		$('#createPanel').fadeOut(100);
		//selectRoom(selectedRoomListId);//select previous room
		
	});
	
	
	function closeCreatePanel(){	
		$('#createPanel').hide();
	}
	closeCreatePanel()
	
	function resetCreatePanel(){
		$('#messageSomeoneFlow').hide();
		$('#scheduleFlow').hide();
		$('#callSomeoneFlow').hide();
		$('#newSpaceFlow').hide();
	}

	
	function hideAllActPanels(){
		$('#chatPanel').hide();
		$('#filesPanel').hide();
		$('#whiteboardPanel').hide();
		$('#intersPanel').hide();
		$('#inCallPanel').hide();
		$('#meetingListPanel').hide();
		$('#taskPanel').hide();
		$('#join_space').hide();

		hideTodaysMeeting();
		hideUnreadSpaces();
	}
	
	
	
	function setThemeColor(type){
		window.themeColor = type;
		if(type == 'grey'){

			
		}else if(type == 'white'){

			
		}
	}
	
	
	function openLeftPanel(){
		window.leftPanelStatus = 'open';
		
		hideRosterPanel('leftpanel')

		hideInMeetingPanels()

		$('#leftPanel').removeClass('close');
		var w = $('#mainframe').width()-$('#leftPanel').width()
		$('#rightPanel').css('width', w);


		$('#button_leftpanel .arrow').css('transform', 'rotate(0deg)');

	}

	openLeftPanel();
	
	function closeLeftPanel(){
		window.leftPanelStatus = 'closed';
		

		$('#leftPanel').addClass('close');
		var w = $('#mainframe').width()
		$('#rightPanel').css('width', w);
		
		$('#button_leftpanel .arrow').css('transform', 'rotate(180deg)');	

		if(rosterClosedFrom == 'leftpanel'){
			showRosterPanel('leftpanel');
		}


		
	}
	
	var unreadSpaces;
	
	function createRoomList(tagList, searchValue){

		$('.todays_meeting').hide();
		$('.unread_spaces').hide();
	
		$('#room-list-wrapper').html('');
		roomListTopItemsHeight = 0;
		
		searchValue = $.trim(searchValue).toLowerCase();
		
		sortRoomListData();

		var room_list_new = room_list;

		var split_groups = false;
		if(searchValue.length > 0 && selectedFilterType == undefined){
			room_list_new = room_list_all;

			if(selectedSearchTab == 'tab_space' && searchInputTagList.length == 0){
				split_groups = true;
				// show 2 groups [people, space]
				var len = room_list_new.length;	
				for(var i=0; i<len; i++){
					var room = room_list_new[i];
					room.sortindex = i;
				}
				room_list_new.sort(function(a, b){
					if(a.type == 'people' && b.type == 'space'){
						return -1;
					}else if(b.type == 'people' && a.type == 'space'){
						return 1;
					}else{
						return a.sortindex - b.sortindex; // fix chrome sort issue
					}
			    });
			}
		}
		
		var len = room_list_new.length;
		var room_item_dom = $('.empty-list-item');
		room_item_dom.hide();

		var splitter_pinned = $('.splitter_pinned').clone();
		$('.splitter_pinned').hide();

		$('.searchres_group_header').hide();

		var unjoined_spaces = [];
		unreadSpaces = 0;
	
		roomItemHeight = room_item_dom.height();
		
		var top = 0;

		if(searchInputTagSuffix != '' && tagList[0] == 'in:'){
			// Search (in: roomName )
			// show messages of this space

			for(var i=0; i<len; i++){
				var room = room_list_new[i];

				var id = room.id;
				var name = room.name;
				var type = room.type;
				

				if(name == searchInputTagSuffix){
					for(var k in room.chatMsg){
						var itmmsg = room.chatMsg[k];

						if(itmmsg.type != undefined){
							continue;
						}
						
						var itm = room_item_dom.clone();
						var people = people_list[itmmsg.name];
						
						itm.find('.unread-dot').hide();
						itm.find('.ico_mention').hide();
						itm.find('.ico_muted').hide();
						itm.find('.ico_ppl').hide();

						itm.show();
						itm.removeClass('empty-list-item');
						itm.css('top', top + 'px');
						itm.attr('data-id', id);
						itm.attr('id', 'room-' + id);
						itm.attr('classid', 'itmclassid' + id);
						itm.addClass('itmclassid' + id);

						itm.find('.ls-team-name').html('');

						itm.find('.ls-room-name').html(name);
						itm.find('.ls-room-name').css('top', itm.find('.ls-room-time').css('top'));
						itm.find('.ls-room-msg').html(itmmsg.name.split(' ')[0]+' ・ '+itmmsg.msg);
						itm.find('.ls-room-time').html(itmmsg.flagtime);
						itm.find('.avatar-letter').text(name[0].toUpperCase());

						if(people != undefined && people.avatar.length > 0){
							itm.find('.ava-img').css( 'background-image', 'url(' + hypeDocument.resourcesFolderURL() + '/' + people.avatar + ')' );
							itm.find('.ava-img').show();
							if(type == 'people'){
								itm.find('.avatar').attr('people', name);
							}
						}else{
							itm.find('.ava-img').hide();
						}

						itm.find('.in_call_time').hide();

						$('#room-list-wrapper').append(itm);
						top += roomItemHeight;

					}
				}
			}

		} else if(selectedSearchTab == 'tab_msg' && searchValue.length > 0){
			// Search (String )
			// show all space messages

			for(var i=0; i<len; i++){
				var room = room_list_new[i];

				var id = room.id;
				var name = room.name;
				var type = room.type;

				for(var k in room.chatMsg){
					var itmmsg = room.chatMsg[k];

					if(itmmsg.type != undefined || itmmsg.msg.toLowerCase().indexOf(searchValue) == -1){
						continue;
					}
					
					var itm = room_item_dom.clone();
					var people = people_list[itmmsg.name];
					
					itm.find('.unread-dot').hide();
					itm.find('.ico_mention').hide();
					itm.find('.ico_muted').hide();
					itm.find('.ico_ppl').hide();

					itm.show();
					itm.removeClass('empty-list-item');
					itm.css('top', top + 'px');
					itm.attr('data-id', id);
					itm.attr('id', 'room-' + id);
					itm.attr('classid', 'itmclassid' + id + '_' + k);
					itm.addClass('itmclassid' + id + '_' + k);

					itm.attr('chat-name', itmmsg.name);
					itm.attr('chat-msg', itmmsg.msg);

					itm.find('.ls-team-name').html('');

					itm.find('.ls-room-name').html(name);
					itm.find('.ls-room-name').css('top', itm.find('.ls-room-time').css('top'));
					itm.find('.ls-room-msg').html(itmmsg.name.split(' ')[0]+' ・ '+itmmsg.msg);
					itm.find('.ls-room-time').html(itmmsg.flagtime);
					itm.find('.avatar-letter').text(name[0].toUpperCase());

					if(people != undefined && people.avatar.length > 0){
						itm.find('.ava-img').css( 'background-image', 'url(' + hypeDocument.resourcesFolderURL() + '/' + people.avatar + ')' );
						itm.find('.ava-img').show();
						if(type == 'people'){
							itm.find('.avatar').attr('people', name);
						}
						
					}else{
						itm.find('.ava-img').hide();
					}

					itm.find('.in_call_time').hide();

					$('#room-list-wrapper').append(itm);
					top += roomItemHeight;

				}

			}

		} else if(selectedFilterType == 'filter' && (selectedFilterName == 'Mentions' || selectedFilterName == 'Flags') && searchValue.length == 0){
			// flagged room list

			for(var i=0; i<len; i++){
				var room = room_list_new[i];

				var id = room.id;
				var name = room.name;
				var type = room.type;

				for(var k in room.chatMsg){
					var itmmsg = room.chatMsg[k];
					if(itmmsg.msg && itmmsg.msg.indexOf('color_mention_me') > -1 && selectedFilterName == 'Mentions' || itmmsg.flag && selectedFilterName == 'Flags'){
						var itm = room_item_dom.clone();
						var people = people_list[itmmsg.name];
						
						itm.find('.unread-dot').hide();
						itm.find('.ico_mention').hide();
						itm.find('.ico_muted').hide();
						itm.find('.ico_ppl').hide();

						itm.show();
						itm.removeClass('empty-list-item');
						itm.css('top', top + 'px');
						itm.attr('data-id', id);
						itm.attr('id', 'room-' + id);
						itm.attr('classid', 'itmclassid' + id + '_' + k);
						itm.addClass('itmclassid' + id + '_' + k);

						itm.attr('chat-name', itmmsg.name);
						itm.attr('chat-msg', itmmsg.msg);

						itm.find('.ls-team-name').html('');

						itm.find('.ls-room-name').html(name);
						itm.find('.ls-room-name').css('top', itm.find('.ls-room-time').css('top'));
						itm.find('.ls-room-msg').html(itmmsg.name.split(' ')[0]+' ・ '+itmmsg.msg);
						itm.find('.ls-room-time').html(itmmsg.flagtime);
						itm.find('.avatar-letter').text(name[0].toUpperCase());

						if(people != undefined && people.avatar.length > 0){
							itm.find('.ava-img').css( 'background-image', 'url(' + hypeDocument.resourcesFolderURL() + '/' + people.avatar + ')' );
							itm.find('.ava-img').show();
							if(type == 'people'){
								itm.find('.avatar').attr('people', name);
							}
						}else{
							itm.find('.ava-img').hide();
						}

						itm.find('.in_call_time').hide();

						$('#room-list-wrapper').append(itm);
						top += roomItemHeight;

					}
				}

			}

		}else{

			// none flagged room list

			var people_group_header = false;
			var space_group_header = false;

			if(!inSearchView){

				var lh = $('#leftPanel').height();
				var headh = $('#leftPanel .head').height();
				//var fixedSpaceH = $('.todays_meeting').height()+$('.unread_spaces').height();
				var dph = $('#btn_device_pairing').height();

				var h1 = $('.todays_meeting').height();
				var h2 = $('.unread_spaces').height();

				$('#room-list-wrapper').css('top', h1+h2);
				$('#leftPanel .itemlist').css('top', headh);// removed fixedSpaceH height
				$('#leftPanel .itemlist').css('height', lh-headh-dph);

				$('.todays_meeting').show();
				$('.unread_spaces').show();

				if(!device_paired){
					$('#pop_device_pairing').fadeIn();
				}else{
					$('#pop_device_paired').fadeIn();
				}

			}else if(selectedFilterType == 'team'){

				var lh = $('#leftPanel').height();
				var headh = $('#leftPanel .head').height();

				$('#room-list-wrapper').css('top', 0);
				$('#leftPanel .itemlist').css('top', headh);
				$('#leftPanel .itemlist').css('height', lh-headh);

				// move General space to top
				room_list_new = room_list_new.slice();
				var len = room_list_new.length;	
				for(var i=0; i<len; i++){
					var room = room_list_new[i];
					room.sortindex = i;
				}
				room_list_new.sort(function(a, b){
					if(a.name == 'General' && b.name != 'General'){
						return -1;
					}else if(a.name != 'General' && b.name == 'General'){
						return 1;
					}else{
						return a.sortindex - b.sortindex; // fix chrome sort issue
					}
			    });

			}

			var pinned_cnt = 0;

			for(var i=0; i<len; i++){
				var room = room_list_new[i];

				var id = room.id;
				var name = room.name;
				var type = room.type;
				var people = people_list[name];
				var mention = 0;
				var muted = room.muted;
				var pin = room.pin;
				var draft = room.draft;
				var fav = room.fav;
				var incall = room.incall;
				var flag = false;

				// find unread
				var unread = false;
				for(var k in room.chatMsg){
					var itmmsg = room.chatMsg[k];
					if(itmmsg.msg && itmmsg.unread){
						unread = true;
						break;
					}
				}
				// find mentions
				for(var k in room.chatMsg){
					var itmmsg = room.chatMsg[k];
					if(itmmsg.msg && itmmsg.unread && itmmsg.msg.indexOf('color_mention_me') > -1){
						mention++;
						whoMentioned = itmmsg.name;
					}
				}

				if(split_groups){
					if(!people_group_header && type == 'people'){
						people_group_header = true;
						var header = $('.searchres_group_header').clone();
						header.show();
						header.find('.lb').text('People');

						$('#room-list-wrapper').append(header);
						header.css('top', top + 'px');
						top += header.height();

					}else if(!space_group_header && type == 'space'){
						space_group_header = true;
						var header = $('.searchres_group_header').clone();
						header.show();
						header.find('.lb').text('Spaces');

						top += 10;
						$('#room-list-wrapper').append(header);
						header.css('top', top + 'px');
						top += header.height();
					}
				}

				for(var k in room.chatMsg){
					if(room.chatMsg[k].flag){
						flag = true;
						break;
					}
				}


				if(selectedFilterType == 'filter'){
					if(selectedFilterName == 'People' && type != 'people'){
						continue;
					}
					if(selectedFilterName == 'Unread' && !unread){
						continue;
					}
					if(selectedFilterName == 'Favorites' && !fav){
						continue;
					}
					if(selectedFilterName == 'Mentions' && mention == 0){
						continue;
					}
					if(selectedFilterName == 'Flags' && !flag){
						continue;
					}
					if(selectedFilterName == 'Drafts' && !draft){
						continue;
					}

				} else if(selectedFilterType == 'team') {
					var spaceInTeam = true;
					for(var t=0; t<team_list.length; t++){
						var team = team_list[t];
						if(team.name == selectedFilterName){
							var teamspace = team.spaces;
							if(team.name != room.team){
								spaceInTeam = false;
							}

							for(var k=teamspace.length-1; k>=0; k--){
								var spacename = teamspace[k];
								var foundspace = false;
								for(var j=room_list_new.length-1; j>=0; j--){
									if(spacename == room_list_new[j].name){
										foundspace = true;
										break;
									}
								}
								if(!foundspace && unjoined_spaces.indexOf(spacename) == -1){

									if(searchValue != ''){
										var found = false;
										var name_arr = spacename.split(' ');
										for(var g=0; g<name_arr.length; g++){
											var str = name_arr[g];
											if(str.toLowerCase().indexOf(searchValue) == 0){
												found = true;
											}
										}
										if(found){
											unjoined_spaces.push(spacename);
										}
									}else{
										unjoined_spaces.push(spacename);
									}
									
								}
							}

							break;
						}
					}
					if(!spaceInTeam){
						continue;
					}
				}

				
				var itm = room_item_dom.clone();

				if(searchValue.length > 0){
					itm.addClass('search_res');
				}
				
				itm.find('.ico_mention').hide();
				itm.find('.ico_muted').hide();
				itm.find('.ico_ppl').hide();
				
				
				if(pin){
					pinned_cnt++;
				}else if(pinned_cnt > 0 && !splitter_pinned.is(':visible')){
					$('#room-list-wrapper').append(splitter_pinned);
					splitter_pinned.css('top', top + 'px');
					splitter_pinned.show();
					top += splitter_pinned.height();
				}

				
				itm.show();
				itm.removeClass('empty-list-item');
				itm.css('top', top + 'px');
				itm.attr('data-id', id);
				itm.attr('data-name', name);
				itm.attr('id', 'room-' + id);
				itm.attr('classid', 'itmclassid' + id);
				itm.addClass('itmclassid' + id);
				
				var hl_name = '';
				
				if(searchValue != ''){
					var found = false;
					var name_arr = name.split(' ');
					for(var k=0; k<name_arr.length; k++){
						var str = name_arr[k];
						if(str.toLowerCase().indexOf(searchValue) == 0){
							var hl = str.substr(0, searchValue.length);
							str = '<span class="hl">'+hl+'</span>'+str.substr(hl.length);
							found = true;
						}
						hl_name += str+' ';
					}
					if(!found){
						continue;
					}
				}else{
					hl_name = name;
				}

				
				
				itm.find('.ls-room-name').html(hl_name);
				itm.find('.avatar-letter').text(name[0].toUpperCase());
				
				if(people != undefined && people.avatar.length > 0){
					itm.find('.ava-img').css( 'background-image', 'url(' + hypeDocument.resourcesFolderURL() + '/' + people.avatar + ')' );
					itm.find('.ava-img').show();
					itm.find('.avatar').css('background-color', 'rgba(0,0,0,0)');
					if(type == 'people'){
						itm.find('.avatar').attr('people', name);
					}
				}else{
					itm.find('.ava-img').hide();
				}

				// space
				itm.find('.ls-team-name').html('');
				for(var s = team_list.length-1; s>=0; s--){
					var team = team_list[s];
					var color = team.color;
					var s_name = team.name;
					var s_spaces = team.spaces;
					if(s_name == room.team){
						if(selectedFilterType != 'team'){
							itm.find('.ls-team-name').html(s_name);
							itm.find('.ls-room-name').css('top', '9px');
							itm.find('.ls-team-name').css('color', color);
						}
						itm.find('.avatar').css('background-color', color);
						break;
					}
				}


				if(unread){
					unreadSpaces++;
				}

				if(unread || mention > 0){
					itm.addClass('bold');
				}
				if(!unread || mention > 0){
					itm.find('.unread-dot').hide();
				}
				if(mention > 0){
					itm.find('.ico_mention').show();
					itm.find('.ico_mention').attr('tooltip', whoMentioned.split(' ')[0]+' mentioned you');
					regTooltip(itm.find('.ico_mention'), 'up');
				}
				if((!unread && mention == 0) && muted > 0){
					element.find('.ico_muted').show();
				}
				if(incall_room_id != id){
					itm.find('.in_call_time').hide();
				}

				$('#room-list-wrapper').append(itm);

				if(getSpaceAttr(id, 'meeting_started') == 1){
					setOBTPRoom(false);
				}
				
				top += roomItemHeight;
			}


			var splitter_unjoined = $('.splitter_unjoined').clone();
			$('.splitter_unjoined').hide();

			if(unjoined_spaces.length > 0){

				if(unjoined_spaces.length > 1){
					splitter_unjoined.find('.lb_unjoined_spaces').text(unjoined_spaces.length + ' unjoined spaces');
				}else{
					splitter_unjoined.find('.lb_unjoined_spaces').text(unjoined_spaces.length + ' unjoined space');
				}

				splitter_unjoined.show();
				$('#room-list-wrapper').append(splitter_unjoined);
				splitter_unjoined.css('top', top + 'px');
				top += splitter_unjoined.height();

				for(var i=unjoined_spaces.length-1; i>=0; i--){
					var name = unjoined_spaces[i];
					var itm = room_item_dom.clone();
				
					itm.find('.ico_mention').hide();
					itm.find('.ico_muted').hide();
					itm.find('.ico_ppl').hide();
					itm.find('.unread-dot').hide();
					itm.find('.in_call_time').hide();

					itm.show();
					itm.removeClass('empty-list-item');
					itm.css('top', top + 'px');
					//itm.attr('data-id', id);
					//itm.attr('id', 'room-' + id);

					var hl_name = '';
					if(searchValue != ''){
						var name_arr = name.split(' ');
						for(var g=0; g<name_arr.length; g++){
							var str = name_arr[g];
							if(str.toLowerCase().indexOf(searchValue) == 0){
								var hl = str.substr(0, searchValue.length);
								str = '<span class="hl">'+hl+'</span>'+str.substr(hl.length);
							}
							hl_name += str+' ';
						}

						itm.addClass('search_res');

					}else{
						hl_name = name;
					}
								
					itm.find('.ls-room-name').html(hl_name);
					itm.find('.avatar-letter').text(name[0].toUpperCase());
					itm.find('.ava-img').hide();

					for(var s = team_list.length-1; s>=0; s--){
						var team = team_list[s];
						var color = team.color;
						var s_name = team.name;
						var s_spaces = team.spaces;
						if(s_spaces.indexOf(name) > -1){
							itm.attr('data-team', s_name);
							itm.attr('data-color', color);
							itm.find('.avatar').css('background-color', color);
							break;
						}
					}	

					itm.attr('data-unjoined', 1);
					itm.attr('data-name', name);
					

					var tmpid = randomNumRange(1000,2000);
					itm.attr('data-id', tmpid);
					itm.attr('id', 'room-' + tmpid);
					itm.attr('classid', 'itmclassid' + tmpid);
					itm.addClass('itmclassid' + tmpid);
			
					$('#room-list-wrapper').append(itm);
					
					top += roomItemHeight;
				}

			}

		}


		if(unreadSpaces > 1 || unreadSpaces == 0){
			$('.lb_unreadSpaces').text(unreadSpaces+' unread spaces');
		}else{
			$('.lb_unreadSpaces').text(unreadSpaces+' unread space');
		}
		
		$('#room-list-wrapper').css('height', top + 'px');
		
		$('#room-list-wrapper .ls').off('click', setSelection);
		$('#room-list-wrapper .ls').on('click', setSelection);

		$('.todays_meeting').off('click', setSelection);
		$('.todays_meeting').on('click', setSelection);

		$('.unread_spaces').off('click', setSelection);
		$('.unread_spaces').on('click', setSelection);

		$('#room-list-wrapper .ls').contextmenu(showRoomListContextmenu);


		// set room list scrollbar style
		initSpaceScroll();


		$("#leftPanel .itemlist").scroll(function() {
			onRoomListScroll();
		});

		$("#leftPanel .indicator_new").hide();
		$("#leftPanel .indicator_call").hide();


		$("#leftPanel .indicator_new").off('click');
		$("#leftPanel .indicator_new").on('click', function(evt){
			evt.stopPropagation();
			if($("#leftPanel .indicator_new .ico_up").is(':visible')){
				$("#leftPanel .itemlist").getNiceScroll(0).doScrollTop(0, 500);
			}else{
				var sh = $("#leftPanel .itemlist").height();
				var lh = $("#room-list-wrapper").height();
				$("#leftPanel .itemlist").getNiceScroll(0).doScrollTop(lh-sh, 500);
			}
		});

		$("#leftPanel .indicator_call").off('click');
		$("#leftPanel .indicator_call").on('click', function(evt){
			evt.stopPropagation();
			$("#leftPanel .itemlist").getNiceScroll(0).doScrollTop(0, 500);
		});
		
		onRoomListScroll();


		// contact card
		$('#room-list-wrapper .avatar').off('mouseover');
		$('#room-list-wrapper .avatar').on('mouseover', function(evt){
			evt.stopPropagation();
			var peoplename = $(this).attr('people');
			if(!peoplename){
				return;
			}

			var elemL = $(this).offset().left;
			var elemT = $(this).offset().top;
			var deskL = $('#desktop').offset().left;
			var deskT = $('#desktop').offset().top;
			var top = elemT - deskT + $(this).height()/2;
			var left = elemL - deskL + $(this).width();
			var point = {
				'top': top,
				'left': left
			};

			var ref = $(this);
			var tmo_id = setTimeout(function(){
				showContactCard(peoplename, 'left', point, ref);
			}, 500)

			$(this).attr('tmo_id', tmo_id);
		});

		$('#room-list-wrapper .avatar').off('mouseout');
		$('#room-list-wrapper .avatar').on('mouseout', function(evt){
			evt.stopPropagation();
			var tmo_id = $(this).attr('tmo_id');
			clearTimeout(tmo_id)
		});

	}


	function initSpaceScroll(){
		$("#leftPanel .itemlist").niceScroll({
	        	cursorwidth: "7px",
	        	cursorcolor:"rgba(255,255,255,0.5)",
	        	cursorborder:"2px solid rgba(255,255,255,0)"
	    	});

		$("#leftPanel .itemlist").getNiceScroll(0).resize();
	}


	function onRoomListScroll(){
		if(selectedFilterName || inSearchView){
			return;
		}

		var itmh = $('.empty-list-item').height();
		var top = $("#leftPanel .itemlist").position().top;
		var st = $("#leftPanel .itemlist").scrollTop();
		var sh = $("#leftPanel .itemlist").height();
		var lh = $("#room-list-wrapper").height();

		$("#leftPanel .indicator_new").hide();
		$("#leftPanel .indicator_call").hide();

		// visible area from index
		var from_idx = Math.floor((st+itmh/2)/itmh);
		var to_idx = Math.ceil((st+sh-itmh/2)/itmh)-1;

		var len = room_list.length;

		var showNewTopBtn = false;
		var showNewBotBtn = false;
		var showCallBtn = false;

		for(var i=0; i<len; i++){
			var room = room_list[i];
			var id = room.id;

			// find unread
			var unread = false;
			for(var k in room.chatMsg){
				var itmmsg = room.chatMsg[k];
				if(itmmsg.msg && itmmsg.unread){
					unread = true;
					break;
				}
			}

			// find mentions
			var mention = 0;
			for(var k in room.chatMsg){
				var itmmsg = room.chatMsg[k];
				if(itmmsg.msg && itmmsg.unread && itmmsg.msg.indexOf('color_mention_me') > -1){
					mention++;
				}
			}

			if(i < from_idx && (unread || mention)){
				showNewTopBtn = true;
			}
			if(i > to_idx && (unread || mention)){
				// DO NOT SHOW new indicator ON BOTTOM
				//showNewBotBtn = true;
			}

			if(i < from_idx && $('#room-'+id+' .in_call_time').is(':visible')){
				showCallBtn = true;
			}
		}

		var bh = $("#leftPanel .indicator_new").height();

		if(showCallBtn){
			$("#leftPanel .indicator_call").show();
			$("#leftPanel .indicator_call").css('top', (top+10)+'px');
		}

		if(showNewTopBtn && !showCallBtn){
			$("#leftPanel .indicator_new").show();
			$("#leftPanel .indicator_new .ico_down").hide();
			$("#leftPanel .indicator_new .ico_up").show();
			$("#leftPanel .indicator_new").css('top', (top+10)+'px');
		}

		if(showNewBotBtn && !$("#leftPanel .indicator_new").is(':visible')){
			$("#leftPanel .indicator_new").show();
			$("#leftPanel .indicator_new .ico_down").show();
			$("#leftPanel .indicator_new .ico_up").hide();
			$("#leftPanel .indicator_new").css('top', (top+sh-bh-10)+'px');
		}
	}

	function createNewSpace(type, name, peoplelist){
		for(var i=room_list_all.length-1; i>=0; i--){
			var itm = room_list_all[i];
			if(itm.name == name){
				return itm;
			}
		}

		space_id_counter++;

		var space = {
			id: space_id_counter,
			name: name,
			type: type,
			mention: 0,
			draft: false,
			people: peoplelist,
			fileList: [],
			whiteboardList: [],
			meetingList: [],
			taskList: [],
			chatMsg: []
		};

		room_list_all.push(space);

		return space;
	}

	function sortRoomListData(){
		// move incall items to top
		var len = room_list.length;	
		for(var i=0; i<len; i++){
			var room = room_list[i];
			room.sortindex = i;
		}

		room_list.sort(function(a, b){
			if((Number(a.pin) > 0 && isNaN(b.pin)) || Number(a.pin) > Number(b.pin)){
				return -1;
			}else if((Number(b.pin) > 0 && isNaN(a.pin)) || Number(a.pin) < Number(b.pin)){
				return 1;
			}else if(a.incall && !b.incall){
				return -1;
			}else if(!a.incall && b.incall){
				return 1;
			}else{
				return a.sortindex - b.sortindex; // fix chrome sort issue
			}
	    });

	}

	function sortRoomListItem(){

		sortRoomListData();
	    
	    // animate incall item to top
		var len = room_list.length;
		var roomItemHeight = $('.empty-list-item').height();
		
		var top = roomListTopItemsHeight;
		var pinned_cnt = 0;
		var splitter_pinned = $('#room-list-wrapper .splitter_pinned');
		if(splitter_pinned.length == 0){
			splitter_pinned = $('.splitter_pinned').clone();
			$('#room-list-wrapper').append(splitter_pinned);
			splitter_pinned.css('top', '0px');
		}
		splitter_pinned.hide();

		for(var i=0; i<len; i++){
			var room = room_list[i];

			var id = room.id;
			var name = room.name;
			var type = room.type;
			var people = people_list[name];
			
			var pin = room.pin;


			var itm = $('#room-'+id);

			if(pin){
				pinned_cnt++;
			}else if(pinned_cnt > 0 && !splitter_pinned.is(':visible')){
				splitter_pinned.show();
				splitter_pinned.animate(
					{
						top: top+'px'
					},
					{
						queue:false,
						duration:300,
						specialEasing: {
					    	top: "linear",
					    }
					}
				);

				top += splitter_pinned.height();
			}
			
			itm.animate(
				{
					top: top+'px'
				},
				{
					queue:false,
					duration:300,
					specialEasing: {
						top: "linear",
					}
				}
			);
			
			top += roomItemHeight;
		}


	}

	

	// join space
	var join_space_name;
	$('#btn_join_space').on('click', function(evt){
		evt.stopPropagation();

		var spaceItem;
		// add people to space list
		var plist = [];
		for(var p in people_list){
			if(p != self_name){
				plist.push(p);
			}
		}
		spaceItem = createNewSpace('space', join_space_name, plist.slice(0,4));

		if(spaceItem.chatMsg == undefined){
			spaceItem.chatMsg = [];
		}
		var date = new Date();
		var hour = date.getHours();
		var min = date.getMinutes();
		var suffix;
		if(hour < 12){
			suffix = 'AM'
		}else{
			hour -= 12;
			suffix = 'PM'
		}
		var time = hour+':'+min+' '+suffix;
		spaceItem.chatMsg.push({type:'splitter_joined', msg:'You joined this space. '+time});
		
		if(incall_room_id){
			// second item
			room_list.splice(1, 0, spaceItem);
		}else{
			// first item
			room_list.unshift(spaceItem);
		}

		createRoomList();
		selectRoom(spaceItem.id);
		openLeftPanel();

		cancelSearch();

		$('#join_space').hide();
	
	});

	function selectTodaysMeeting(){
		$('#leftPanel .ls').removeClass('selected');
		$('.todays_meeting').addClass('selected');
		
		hideAllActPanels();

		showTodaysMeeting();
	}

	function selectUnreadSpaces(){
		$('#leftPanel .ls').removeClass('selected');
		$('.unread_spaces').addClass('selected');
		
		hideAllActPanels();

		showUnreadSpaces();
	}
	
	// select list item
	var selectedMsgFromSearch = {};
	function setSelection(event){
		event.stopPropagation();

		var element = $(this);
		var id = Number(element.attr('data-id'));
		var classid = element.attr('classid');
		var unjoined = element.attr('data-unjoined');
		var name = element.attr('data-name');
		var chat_name = element.attr('chat-name');
		var chat_msg = element.attr('chat-msg');

		selectedMsgFromSearch.name = chat_name;
		selectedMsgFromSearch.msg = chat_msg;

		var roomitm;

		hideFTE();

		if(element.hasClass('todays_meeting')){
			selectTodaysMeeting();
			dismissWaffleMenu();
			if(!FTEcompleted && !FTEdone_todaysMeeting){
				gotoFTE_todaysMeeting();
			}
			selectedRoomListId = -100;
			return;
		}

		if(element.hasClass('unread_spaces')){
			selectUnreadSpaces();
			dismissWaffleMenu();
			selectedRoomListId = -100;
			return;
		}

		$('.todays_meeting').removeClass('selected');
		$('.unread_spaces').removeClass('selected');

		if(searchInputTagList.length > 0 && searchInputTagList[0] == 'in:' && searchInputTagSuffix == ''){
			var tag = 'in: '+name;
			searchInputTagSuffix = name;
			$('#searchBox .search-input-box').importTags('');
			$('#searchBox .search-input-box').addTag(tag);
			$('#'+searchInputId).val('');
			currentSearchValue = '';

			// show tabs
			$('#leftPanel .tabs').show();
			$('#leftPanel .tabs .tab_space').hide();
			setSearchTab('tab_msg');

			var lh = $('#leftPanel').height();
			var headh = $('#leftPanel .head').height();
			var tabh = $('#leftPanel .tabs').height()+10;

			$('#room-list-wrapper').css('top', 0);
			$('#leftPanel .itemlist').css('top', headh+tabh);
			$('#leftPanel .itemlist').css('height', lh-headh-tabh);

			$('#leftPanel .phonelist').hide();

			createRoomList(searchInputTagList, currentSearchValue);
			return;
		}

		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.id == id){
				roomitm = itm;
				break;
			}
		}

		if(unjoined){
			// show join space UI
			join_space_name = name;
			$('#join_space .room_name').text(element.attr('data-name'));
			$('#join_space .team_name').text(element.attr('data-team'));
			$('#join_space .team_name').css('color', element.attr('data-color'));
			$('#join_space .avatar').css('background-color', element.attr('data-color'));
			$('#join_space .avatar .ava-img').hide();
			$('#join_space .avatar .avatar-letter').text(element.attr('data-name')[0].toUpperCase());
			$('#join_space').show();
			return;
		}else{
			$('#join_space').hide();
		}

		if($('#btn_cancel_search').is(':visible') && !selectedFilterType && selectedSearchTab != 'tab_msg'){
		
			// add new room to top
	    	var should_add_new = true
			for(var i=room_list.length-1; i>=0; i--){
				var itm = room_list[i];
				if(Number(itm.id) == id){
					roomitm = itm;
					should_add_new = false;
					break;
				}
			}
			
			if(should_add_new){
				
				for(var i=room_list_all.length-1; i>=0; i--){
					var itm = room_list_all[i];
					if(Number(itm.id) == id){
						roomitm = itm;
						itm.defaultPanel = undefined;
						room_list.unshift(itm);
						
						break;
					}
				}

			}
			
			cancelSearch(); 
		}

		if(FTEdone_space && roomitm && (roomitm.defaultPanel || getSpaceAttr(id, 'data-current-panel'))){
			dismissWaffleMenu();
		}else if(!FTEdone_space){
			if(FTEstarted){
				gotoFTE_activityBalls();
			}
			showWaffleMenu(true, true);
		}

		selectRoom(id);

		if(selectedMsgFromSearch.name && selectedMsgFromSearch.msg){
			showActPanel('chat');
		}

		//override left panel selection
		if($('#room-list-wrapper').find('.'+classid).length>0){
			removeRoomSelection();
			$('#room-list-wrapper').find('.'+classid).addClass('selected');
		}
		
	}

	function removeRoomSelection(){
		$('#room-list-wrapper .ls').removeClass('selected');
	}
	
	function selectFirstRoom(){
		var ls = $($('#room-list-wrapper').find('.ls')[0]);
		selectRoom(ls.attr('data-id'));
	}
	
	
	function selectRoom(id){
	
		selectedRoomListId = id;
		var element = $('#room-'+id);
		
		$('#room-list-wrapper .ls').removeClass('selected');
		element.addClass('selected');
		
		// Change room header
		var roomName = element.find('.ls-room-name').text();
		
		$('#right-panel-title .txt').text(roomName);
		$('.panel-title .txt').text(roomName);


		// focus input box
		//$('#chat-input-box input').focus();
		
		for(var i=room_list.length-1; i>=0; i--){
			var room = room_list[i];
			if(room.id == id){
				var panel = room.defaultPanel; 
				if(getSpaceAttr(id, 'data-current-panel')){
					panel = getSpaceAttr(id, 'data-current-panel');
				}
				
				if(getSpaceAttr(id, 'data-incall') == 'true'){
					panel = 'call';
				}
				
				if($('#room-'+id+' .in_call_time').is(':visible')){
					if(!is_right_click){
						//closeLeftPanel();
					}
					is_right_click = false;
					panel = 'call';
				}

				// switch to chat when select flags/mentions/drafts filters
				if(selectedFilterType == 'filter' && (selectedFilterName == 'Flags' || selectedFilterName == 'Mentions' || selectedFilterName == 'Drafts' || selectedFilterName == 'Unread' || selectedFilterName == 'Notified')){
					panel = 'chat';
				}

				if(room.muted){
					element.find('.ico_muted').show();
				}

				if(panel){
					showActPanel(panel);
				}else{
					hideAllActPanels();
					showWaffleMenu(false, true);
				}

				// mark as read
				for(var k in room.chatMsg){
					var itmmsg = room.chatMsg[k];
					if(itmmsg.msg){
						itmmsg.unread = false; 
					}
				}
				
				break;
			}
		}
		if( element.find('.unread-dot').is(':visible') || element.find('.ico_mention').is(':visible') ){
			unreadSpaces--;
		}
		if(unreadSpaces > 1 || unreadSpaces == 0){
			$('.lb_unreadSpaces').text(unreadSpaces+' unread spaces');
		}else{
			$('.lb_unreadSpaces').text(unreadSpaces+' unread space');
		}
		
		// remove any unread notification dots
		element.find('.unread-dot').hide();
		element.find('.ico_mention').hide();
		element.removeClass('bold');
	
	

		setWaffleMenuBubbleHeads();

		closeCreatePanel();
		
	}


	// right click menu for room list items
    $('#contextmenu_roomlist').hide();
    var pin_counter = 1;
    var is_right_click = false;
    var right_click_space_id;
    function showRoomListContextmenu(evt){
    	var contextmenu = $('#contextmenu_roomlist');
    	var id = $(this).attr('data-id');
    	right_click_space_id = id;
    	is_right_click = true;
    	//selectRoom(id); // do not select space on right click

    	var elemL = evt.pageX;
		var elemT = evt.pageY;

		var deskL = $('#desktop').offset().left;
		var deskT = $('#desktop').offset().top;

		var left = elemL - deskL + 3;
		var top = elemT - deskT;

		contextmenu.css('top', top+'px');
		contextmenu.css('left', left+'px');

		var pin = getSpaceAttr(id, 'pin');
		var mute = getSpaceAttr(id, 'muted');

		if(pin > 0){
    		$('#contextmenu_roomlist .btn_pin .lb').text('Unpin');
    	}else{
    		$('#contextmenu_roomlist .btn_pin .lb').text('Pin');
    	}

    	if(mute > 0){
    		$('#contextmenu_roomlist .btn_mute .lb').text('Unmute');
    	}else{
    		$('#contextmenu_roomlist .btn_mute .lb').text('Mute');
    	}

		contextmenu.fadeIn(100);

		$('#room-list-wrapper .ls').off('mouseout');
		setTimeout(function(){
			$('#room-list-wrapper .ls').on('mouseout', function(e) {
				var xPos = e.pageX;
		    	var yPos = e.pageY;
		    	if(!$('#contextmenu_roomlist').hitTest(xPos, yPos)){
					$('#contextmenu_roomlist').fadeOut(100);
			    }
		    });
		}, 1000);
		

		return false; // disable browser default context menu

    }
    $('#contextmenu_roomlist .btn_pin').on('click', function(evt) {
    	var pin = getSpaceAttr(right_click_space_id, 'pin');
    	if(pin > 0){
    		setSpaceAttr(right_click_space_id, 'pin', 0);
    	}else{
    		setSpaceAttr(right_click_space_id, 'pin', pin_counter);
    		pin_counter++;
    	}

		$('#contextmenu_roomlist').hide();

		sortRoomListItem();

    });
    $('#contextmenu_roomlist .btn_mute').on('click', function(evt) {
    	var mute = getSpaceAttr(right_click_space_id, 'muted');
    	if(mute > 0){
    		setSpaceAttr(right_click_space_id, 'muted', 0);
    		$('#room-'+right_click_space_id+' .ico_muted').hide();
    	}else{
    		setSpaceAttr(right_click_space_id, 'muted', 1);
    		$('#room-'+right_click_space_id+' .ico_muted').show();
    	}

    	$('#contextmenu_roomlist').hide();
    });
    $('#contextmenu_roomlist').on('mouseleave', function(evt) {
    	$('#contextmenu_roomlist').fadeOut(100);
    });
    


	function setBubbleHeads(){
		$('#activity_bubble_heads').hide();

		var panel = getSpaceAttr(selectedRoomListId, 'data-current-panel');


		// bubble heads
		var headswidth = $('#activity_bubble_heads').width();
		$('#activity_bubble_heads .itm').remove();
		var headgap = 8;
		var headw;
		var headh;
		var radiusClass;
		if(panel == 'call'){
			headh = 40;
			radiusClass = 'r20';
		}else{
			headh = 64;
			radiusClass = 'r32';
		}

		var len = room_list.length;
		for(var i=0; i<len; i++){
			var itm = room_list[i];
			if(itm.id == selectedRoomListId){

				var people = room_list[i].people;
				var nump = people.length;
				var html = '';
				for(var j=0; j<nump; j++){

					var name = people[j];
					var pdat = people_list[name];
					var img;
					if(panel == 'call' || getSpaceAttr(selectedRoomListId, 'call-type') == 'audio_only'){
						img = pdat.avatar;
					}else{
						img = pdat.gif;
					}
					headw = headh;
					var border = '';
					if(panel != 'call' && name == 'Emma Hirst' && getSpaceAttr(selectedRoomListId, 'call-type') == 'video'){
						headw = 114;
						border += '<div class="bubbleHeadBorder1" style="width:126px; height:74px; left:-6px; bottom:-4px; border-radius:40px; "></div>';
						border += '<div class="bubbleHeadBorder2" style="width:118px; height:66px; left:-2px; bottom:0; border-radius:33px; "></div>';
					}
					var left = (headswidth - nump*headw - headgap*(nump-1))/2 + (headw+headgap)*j;
					
					html += '<div class="bubbleHead" style="width:'+headw+'px; height:'+headh+'px; pointer-events:auto;" tooltip="'+name+'" title="'+name+'">';
					html += border;
					html += '<div class="avatarImage" style="width:'+headw+'px; height:'+headh+'px; border-radius:'+(headh/2)+'px; overflow:hidden; background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + img + '); ">';
					html += '</div>';
					html += '</div>';
				}
				$('#activity_bubble_heads').html(html);
				break;
			}
		}

		// incall - audio only bubble heads
		for(var i=0; i<len; i++){
			var itm = room_list[i];
			if(itm.id == selectedRoomListId){

				var people = room_list[i].people;
				var nump = people.length;
				var html = '';
				for(var j=0; j<nump; j++){

					var name = people[j];
					var pdat = people_list[name];
					var img;
					if(panel == 'call' || getSpaceAttr(selectedRoomListId, 'call-type') == 'audio_only'){
						img = pdat.avatar;
					}else{
						img = pdat.gif;
					}
					headw = headh;
					var border = '';
					if(panel != 'call' && j == 0 && getSpaceAttr(selectedRoomListId, 'call-type') == 'audio_only'){
						border += '<div class="bubbleHeadBorder1" style="width:74px; height:74px; left:-5px; bottom:-5px; border-radius:40px; "></div>';
						border += '<div class="bubbleHeadBorder2" style="width:66px; height:66px; left:-1px; bottom:-1px; border-radius:33px; "></div>';
					}
					var left = (headswidth - nump*headw - headgap*(nump-1))/2 + (headw+headgap)*j;
					
					html += '<div class="bubbleHead" style="width:'+headw+'px; height:'+headh+'px; pointer-events:auto;" tooltip="'+name+'" title="'+name+'">';
					html += border;
					html += '<div class="avatarImage" style="width:'+headw+'px; height:'+headh+'px; border-radius:'+(headh/2)+'px; overflow:hidden; background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + img + '); ">';
					html += '</div>';
					html += '</div>';
				}
				$('#inCallPanel .audio_only .people-avatar').html(html);
				break;
			}
		}


		if($('#room-'+selectedRoomListId+' .in_call_time').is(':visible') && panel == 'call'){
			$('#activity_bubble_heads').show();
			$('.roster').hide();

			shrinkSpaceTitle();

		}else{

			if(panel != 'incall'){
				restoreSpaceTitle();
			}else{
				shrinkSpaceTitle();
			}
			
		}

		setBubbleHeadsAction();
	}


	function setBubbleHeadsAction(){

		$('#people_options').hide();

		$('.bubbleHead').off('click');

		$('#people_options').hide();
		
		$('.bubbleHead').on('click', function(evt){
			evt.stopPropagation();

			if(incall_room_id == undefined){
				return;
			}

			var left = $(this).offset().left - $('#desktop').offset().left + $(this).width()/2 - $('#people_options').width()/2;
			var top = $(this).offset().top - $('#desktop').offset().top + $(this).height() - 10;
			$('#people_options').css('left', left+'px')
			$('#people_options').css('top', top+'px')
			$('#people_options').fadeIn(100);

			// bind people name
			$('#people_options').attr('data-people', $(this).attr('title'));
		
		});

		// add tooltips
		regTooltip($('.bubbleHead'), 'up');
	}

	setBubbleHeadsAction();


	$('#people_options .b_chat').on('click', function(evt){
		evt.stopPropagation();
		$('#people_options').fadeOut(100);
		var peopleName = $('#people_options').attr('data-people');
		
		//112318
		hideInMeetingPanels();
		chatWithPeople(peopleName);
	});


	function setSpaceAttr(id, key, value){
		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.id == id){
				itm[key] = value;
				break;
			}
		}
	}

	function getSpaceAttr(id, key){
		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.id == id){
				return itm[key];
			}
		}
		return undefined;
	}



	function chatWithPeople(peopleName){
		var foundSpace = false;
		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.name == peopleName){
				itm.defaultPanel = 'chat';
				selectRoom(itm.id);
				foundSpace = true;
				break;
			}
		}

		if(!foundSpace){
			// add people to space list
			var newSpaceItem = createNewSpace('people', peopleName, [peopleName]);
			newSpaceItem.defaultPanel = 'chat';
			if(incall_room_id){
				// second item
				room_list.splice(1, 0, newSpaceItem);
			}else{
				// first item
				room_list.unshift(newSpaceItem);
			}
			
			createRoomList();
			selectRoom(newSpaceItem.id);
		}

		openLeftPanel();
		showActPanel('chat');

	}
	
	
	
	
	
	
	
	// -----------------------------------
	//         waffle menu balls
	// -----------------------------------
	
	$('#waffleMenu .btn_chat').on('click', function(evt){		
		evt.stopPropagation();

		showActPanel('chat')

		dismissWaffleMenu();
		$('#waffleMenu .btn_chat .ico_new').hide();	

		
	});
	
	
	$('#waffleMenu .btn_call').on('click', function(evt){		
		evt.stopPropagation();
	
		showActPanel('call')

		dismissWaffleMenu();


	});
	
	
	$('#waffleMenu .btn_sch').on('click', function(evt){		
		evt.stopPropagation();

		showActPanel('schedule')

		dismissWaffleMenu();

		$('#waffleMenu .btn_sch .ico_new').hide();

		
	});
	
	
	$('#waffleMenu .btn_wb').on('click', function(evt){		
		evt.stopPropagation();

		showActPanel('whiteboard')

		dismissWaffleMenu();
		$('#waffleMenu .btn_wb .ico_new').hide();	

		
	});
	
	
	$('#waffleMenu .btn_files').on('click', function(evt){		
		evt.stopPropagation();

		showActPanel('files')

		dismissWaffleMenu();
		$('#waffleMenu .btn_files .ico_new').hide();	

		
	});
	
	
	$('#waffleMenu .btn_tasks').on('click', function(evt){		
		evt.stopPropagation();

		showActPanel('tasks')

		dismissWaffleMenu();
		$('#waffleMenu .btn_tasks .ico_new').hide();	

		
	});

	
	
	var currentVisibleActPanel;
	function showActPanel(panel){
		
		if(panel == 'call' && getSpaceAttr(selectedRoomListId, 'data-incall') == 'true'){
			panel = 'incall';
		}

		if(selectedRoomListId != incall_room_id){
			$('#right-panel-title').show();
		}else{
			$('#right-panel-title').hide();
		}
		
		$('#waffleMenu .selected').hide();
		
		setSpaceAttr(selectedRoomListId, 'data-current-panel', panel);

		setBubbleHeads();

	
		if(panel == 'chat'){
			hideAllActPanels();
			
			currentVisibleActPanel = $('#chatPanel');
			currentVisibleActPanel.show();
			setThemeColor('grey');
			showHud();
			
			chatInputBindingRoomID = null;
			setChatMessage();
			
			$('#waffleMenu .btn_chat .selected').show();

			
		}else if(panel == 'call'){
			hideAllActPanels();

			currentVisibleActPanel = $('#intersPanel');
			currentVisibleActPanel.show();
			$('.obtp_toast').fadeOut();
			setThemeColor('grey');
			showHud();
			
			unmuteSelfVideo();


			$('#selfVideoBackground').show();
			$('#selfVideoBackground .video').append($('#selfViewVideo'));
			$('#selfViewVideo').show();

			
			$('#waffleMenu .btn_call .selected').show();
			
			
			// set button text
			if(getSpaceAttr(selectedRoomListId, 'meeting_started') == 1){
				$('#intersPanel .btn_video .txt').text('Join with video');
				$('#intersPanel .btn_audio .txt').text('Join without video');
			}else{
				$('#intersPanel .btn_video .txt').text('Start with video');
				$('#intersPanel .btn_audio .txt').text('Start without video');
			}
			
			
			// preload video
			var roomData;
			for(var i=room_list.length-1; i>=0; i--){
				var itm = room_list[i];
				if(itm.id == selectedRoomListId){
					roomData = itm;
					break;
				}
			}

			if(roomData.people.indexOf('Linda Sinu') > -1){
				$('#incallvideo').attr('src', resourceUrl + '/video/' + 'Linda.mp4');
			}else if(roomData.people.indexOf('Emma Hirst') > -1){
				$('#incallvideo').attr('src', resourceUrl + '/video/' + 'Emma.mp4');
			}else if(roomData.people.indexOf('Brandon Smith') > -1){
				$('#incallvideo').attr('src', resourceUrl + '/video/' + 'Brandon.mp4');
			}


			// set meeting title
			if(roomData.interstitialPage != undefined && roomData.interstitialPage.meetingTitle != ''){
				$('#intersPanel .name span').text(roomData.interstitialPage.meetingTitle);
				$('#intersPanel .time').text(roomData.interstitialPage.meetingTime);
				$('#intersPanel .title_time').show();
			}else{
				$('#intersPanel .name span').text('');
				$('#intersPanel .time').text('');
				$('#intersPanel .title_time').hide();
			}
			
			if(audio_type == 'callme'){
				$('#intersPanel .tip_callme').show();
			}else{
				$('#intersPanel .tip_callme').hide();
			}


			if(roomData.type == 'phone'){
				$('#intersPanel .option_phone').show();
				$('#intersPanel .option1').hide();
			}else{
				$('#intersPanel .option_phone').hide();
				$('#intersPanel .option1').show();
			}

			
		}else if(panel == 'incall'){			
			hideAllActPanels();

			currentVisibleActPanel = $('#inCallPanel');
			currentVisibleActPanel.show();

			setThemeColor('white');
			autoHideHud();
			
			$('#waffleMenu .btn_call .selected').show();
			
			
			// preload video
			var roomData;
			for(var i=room_list.length-1; i>=0; i--){
				var itm = room_list[i];
				if(itm.id == selectedRoomListId){
					roomData = itm;
					break;
				}
			}

			if(roomData.people.indexOf('Linda Sinu') > -1){
				$('#incallvideo').attr('src', resourceUrl + '/video/' + 'Linda.mp4');
				$('#pipvideo').attr('src', resourceUrl + '/video/' + 'Linda.mp4');
			}else if(roomData.people.indexOf('Emma Hirst') > -1){
				$('#incallvideo').attr('src', resourceUrl + '/video/' + 'Emma.mp4');
				$('#pipvideo').attr('src', resourceUrl + '/video/' + 'Emma.mp4');
			}else if(roomData.people.indexOf('Brandon Smith') > -1){
				$('#incallvideo').attr('src', resourceUrl + '/video/' + 'Brandon.mp4');
				$('#pipvideo').attr('src', resourceUrl + '/video/' + 'Brandon.mp4');
			}

			
			
			
		}else if(panel == 'files'){
			hideAllActPanels();

			currentVisibleActPanel = $('#filesPanel');
			currentVisibleActPanel.show();

			setThemeColor('grey');
			showHud();
			
			setFileList();
			
			$('#waffleMenu .btn_files .selected').show();

			
		}else if(panel == 'whiteboard'){
			hideAllActPanels();

			currentVisibleActPanel = $('#whiteboardPanel');
			currentVisibleActPanel.show();

			setThemeColor('grey');
			showHud();
			
			setWhiteboardList();
			
			$('#waffleMenu .btn_wb .selected').show();

			
		}else if(panel == 'schedule'){
			hideAllActPanels();

			currentVisibleActPanel = $('#meetingListPanel');
			currentVisibleActPanel.show();

			setThemeColor('grey');
			showHud();
			
			setMeetingList();
			
			$('#waffleMenu .btn_sch .selected').show();
			

			
		}else if(panel == 'tasks'){
			hideAllActPanels();

			currentVisibleActPanel = $('#taskPanel');
			currentVisibleActPanel.show();

			setThemeColor('grey');
			showHud();
			
			setTaskList();
			
			$('#waffleMenu .btn_tasks .selected').show();

			
		}
		
		
		setInCallFloatingVideo();


		// set title icon
		var icon = panel;
		if(icon == 'incall'){
			icon = 'call';
		}
		$('#right-panel-title .icon').html('<img style="width:20px; height:20px; pointer-event:none;" src="'+hypeDocument.resourcesFolderURL()+'/ico_s_'+icon+'.svg">');
		//$('#right-panel-title .icon').css( 'background-image', 'url(' + hypeDocument.resourcesFolderURL()+'/ico_s_'+icon+'.svg) no-repeat' );
		
	}
	

	function slideDownPanelContent(){
		return;

		$('#activityPanels .contmove').each(function(index, el) {
			if($(this).attr('ori-top') == undefined){
				$(this).attr('ori-top', $(this).css('top'));
			}
			var top = $(this).attr('ori-top');
			top = Number(top.split('px')[0]);
			$(this).css('top', (top + 45) + 'px');
		});

		$('#chatPanel .messages').css('height', (452-45)+'px');

	}

	function slideUpPanelContent(transition){
		return;

		$('#activityPanels .contmove').each(function(index, el) {
			if($(this).attr('ori-top') != undefined){
				if(transition){
					$(this).animate({
						top: $(this).attr('ori-top')
						},
						500,
						function() {}
					);
				}else{
					$(this).css('top', $(this).attr('ori-top'));
				}
				
			}			
		});

		$('#chatPanel .messages').css('height', 452);
	}
	

	
	function setInCallFloatingVideo(){
		if(getSpaceAttr(incall_room_id, 'call-type') != 'video'){
			return;
		}

		if(others_is_sharing && (!$('#activityPanels .sharing_content').is(':visible') || inCallActivityPanelIsVisible) || incall_room_id != undefined && (selectedRoomListId != incall_room_id || $('#createPanel').is(':visible'))){
			if(!$('#floatingVideo').is(':visible')){
				$('#floatingVideo').fadeIn(200);
				autoHideFloatingVideoCtrl();
			}
		}else if(getSpaceAttr(selectedRoomListId, 'data-incall') == 'true' && !$('#intersPanel').is(':visible') && !$('#inCallPanel').is(':visible')){ 
			// in call, same space, changing activities
			$('#floatingVideo').fadeIn(200); //011918 Fi changed to show pip
		}else{
			$('#floatingVideo').fadeOut(200);
		}

	}
	
	$('#floatingVideo .btn').on('click', function(evt){
		evt.stopPropagation();
	
		// back to call
		dismissWaffleMenu();
		selectRoom(incall_room_id);
		showActPanel('incall');
		closeLeftPanel();
		
	});
	
	
	
	
	// -----------------------------------
	//         input chat message
	// -----------------------------------	
	
	$('.input-box').on('keydown',function(event){
		event.stopPropagation();

	    if(event.keyCode == "13") { // enter

	    	onEnterKeyPressed()

	    }
	}); 
	
	
	function onEnterKeyPressed(){

		var msgstr;
		if(!$('#createPanel').is(':visible')){
			msgstr = $('#chat-input-wrap .input-box').val()
		}else{
			msgstr = $('#chat-input-wrap-dark .input-box').val()
		}
		
		if($.trim(msgstr).length == 0){
			return;
		}

		if($('#createPanel').is(':visible') && $('#messageSomeoneFlow').is(':visible')){
			
			bindChatInputToRoom(new_chat_peoplelist, new_chat_spacename);

			var msg = $('#chat-input-wrap-dark .input-box').val();
			$('#chat-input-wrap-dark .input-box').val('')
			$('#chat-input-wrap .input-box').val(msg);
		}

		// add new room to top
    	var should_add_new = true
		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.id == chatInputBindingRoomID){
				should_add_new = false;
				setSpaceAttr(itm.id, 'defaultPanel', 'chat'); 
				setSpaceAttr(itm.id, 'data-current-panel', 'chat');
				selectRoom(itm.id);
				break;
			}
		}
		
		if(should_add_new){		
			for(var i=room_list_all.length-1; i>=0; i--){
				var itm = room_list_all[i];
				if(itm.id == chatInputBindingRoomID){
				
					var roomid = itm.id;
					itm.chatMsg = [];
					room_list.unshift(itm);
					createRoomList();
					setSpaceAttr(itm.id, 'defaultPanel', 'chat'); 
					setSpaceAttr(itm.id, 'data-current-panel', 'chat');
					selectRoom(roomid);
									
					chatInputBindingRoomID = undefined;
					
					break;
					
				}
			}
		}

		dismissWaffleMenu();
		sendInputChatMessage();

	}

	
	
	function formatNum(n){
		if(n < 10){
			return ('0'+n);
		}else{
			return n;
		}
	}
	
	function getNowTime(){
		var date = new Date();
		var time = formatNum(date.getHours()) + ':' + formatNum(date.getMinutes());
		return time;
	}
	
	
	function sendInputChatMessage(){
	
		var msgstr;
		if(!$('#createPanel').is(':visible')){
			msgstr = $('#chat-input-wrap .input-box').val()
		}else{
			msgstr = $('#chat-input-wrap-dark .input-box').val()
		}
		
		
		if(jQuery.trim(msgstr).length == 0){
			return;
		}
    	
    	var obj = {
    		name: 'You',
			time: getNowTime(),
    		msg: msgstr
    	};
        sendChatMessage(obj);
        
        $('.input-box').val('');
		
	}
	
	
	function sendChatMessage(obj){
	
		if(chatInputBindingRoomID >= 0 && chatInputBindingRoomID != null){
			selectRoom(chatInputBindingRoomID);
			chatInputBindingRoomID = null;
		}
		
		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.id == selectedRoomListId){
				room_list[i].chatMsg.push(obj);
				break;
			}
		}
		
		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.id == selectedRoomListId){
				//room_list[i].chatMsg.push(obj);
				break;
			}
		}
		
		showActPanel('chat');
		setChatMessage();
	}
	
	var chatMsgIdCounter = 0;
	function setChatMessage(){
	
		$('#msg_list_wrapper').html('');
		
		var roomData;
		
		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.id == selectedRoomListId){
				
				roomData = itm;
				break;
			}
		}
		
		var chatMsgList = roomData.chatMsg;
		var len = chatMsgList.length;
		
		$('.empty_splitter_msg_item').hide();
		$('.empty_chat_msg_item').hide();
		$('.empty_meeting_msg_item').hide();
		
		var item_dom = $('.empty_chat_msg_item');
		
		$('#new_msg_splitter').hide();
		
		var top = 8;
	
		for(var i=0; i<len; i++){
			var obj = chatMsgList[i];

			if(obj.id == undefined){
				obj.id = chatMsgIdCounter;
				chatMsgIdCounter++;
			}
			
			var type = obj.type;
			
			
			if(type == undefined){
				
				// chat message
				
				var name = obj.name;
				var time = obj.time;
				var people = people_list[name];
				var msg = obj.msg;
				var flag = obj.flag;
				var unread = obj.unread;

				if(unread && !$('#new_msg_splitter').is(':visible')){
					top += 15;
					$('#new_msg_splitter').show();
					$('#new_msg_splitter').css('top', top + 'px');
					top += 30;
				}
				
				var itm = item_dom.clone();
				itm.show();
				itm.removeClass('empty_chat_msg_item');
				
				itm.css('top', top + 'px');
				itm.css('left', '20px');
				
				itm.find('.name_time').html( name + '&nbsp;&nbsp;&nbsp;&nbsp;' + time );
				//itm.find('.avatar-letter').text(name[0].toUpperCase());
				
				if(people != undefined && people.avatar.length > 0){
					itm.find('.ava-img').css( 'background-image', 'url(' + hypeDocument.resourcesFolderURL() + '/' + people.avatar + ')' );
					itm.find('.ava-img').show();
					if(name != self_name){
						itm.find('.avatar').attr('people', name);
					}
				}else{
					itm.find('.ava-img').hide();
				}		
				
				itm.find('.msg').html( msg );

				if(flag){
					itm.find('.flag_on').show();
				}else{
					itm.find('.flag_on').hide();
				}
				itm.find('.flag').attr('msg-id', obj.id);
	
				$('#msg_list_wrapper').append(itm);
				
				top += itm.find('.msg').height() + 46;

				if(selectedMsgFromSearch.name == name && selectedMsgFromSearch.msg == msg){
					itm.find('.msg').addClass('hl_chat_msg');
				}
				
			} else if(type == 'splitter') {
			 	
			 	// splitter message
			 	var msg = obj.msg;
			 	var after = obj.after;
			 	
			 	var itm = $('.empty_splitter_msg_item').clone();
				itm.show();
				itm.removeClass('empty_splitter_msg_item');
				
				itm.css('top', top + 'px');
				
				itm.find('.msg').html( msg );
				
				$('#msg_list_wrapper').append(itm);
				
				top += itm.find('.msg').height() + 25;
				
				
			} else if(type == 'splitter_joined') {
			 	
			 	// join space message
			 	var msg = obj.msg;

			 	var itm = $('.empty_splitter_msg_item').clone();
				itm.show();
				itm.removeClass('empty_splitter_msg_item');
				
				itm.css('top', top + 'px');
				
				itm.find('.msg').html(msg);
				
				$('#msg_list_wrapper').append(itm);
				top += itm.find('.msg').height() + 46;
				
				
				
			} else if(type == 'scheduled_meeting') {
			 	
			 	var name = obj.name;
				var time = obj.time;
				var people = people_list[name];
				var flag = obj.flag;
				var meeting = obj.meeting;
				
				var itm = item_dom.clone();
				itm.show();
				itm.removeClass('empty_chat_msg_item');

				var meeting_itm = $('.empty_meeting_msg_item').clone();
				meeting_itm.removeClass('empty_meeting_msg_item');
				meeting_itm.show();
				meeting_itm.css('top', 26);
				meeting_itm.css('left', itm.find('.msg').css('left'));
				meeting_itm.css('width', 'calc(100% - 38px)');

				meeting_itm.find('.title').html(meeting.title);
				meeting_itm.find('.host').html(meeting.host);

				var timearr = meeting.time.split(',');
				var time1 = moment($.trim(timearr[0]));
				var time2 = moment($.trim(timearr[1]));
				meeting_itm.find('.time').html(time1.format('MMMM D')+'<br>'+time1.format('h A')+' - '+time2.format('h A'));

				meeting_itm.attr('data-title', meeting.title);
				meeting_itm.attr('data-time', meeting.time);
				
				itm.css('top', top + 'px');
				itm.css('left', '20px');
				
				itm.find('.name_time').html( name + '&nbsp;&nbsp;&nbsp;&nbsp;' + time );
				
				if(people != undefined && people.avatar.length > 0){
					itm.find('.ava-img').css( 'background-image', 'url(' + hypeDocument.resourcesFolderURL() + '/' + people.avatar + ')' );
					itm.find('.ava-img').show();
					if(name != self_name){
						itm.find('.avatar').attr('people', name);
					}
				}else{
					itm.find('.ava-img').hide();
				}	
				
				itm.find('.msg').html( '<br><br><br>' );
				itm.find('.msg').css('pointer-events', 'none');

				if(flag){
					itm.find('.flag_on').show();
				}else{
					itm.find('.flag_on').hide();
				}
				itm.find('.flag').attr('msg-id', obj.id);
		
				itm.append(meeting_itm);
				$('#msg_list_wrapper').append(itm);
				
				top += itm.find('.msg').height() + 46;
			}
		}



		$('#msg_list_wrapper .meeting_item').off('click');
		$('#msg_list_wrapper .meeting_item').on('click', function(evt){
			evt.stopPropagation();
			var title = $(this).attr('data-title');
			var time = $(this).attr('data-time');

			var meeting;
			var curroom;
			for(var i=0; i<room_list.length; i++){
				var room = room_list[i];
				if(room.id == selectedRoomListId){
					curroom = room;
					for(var j=0; j<room.meetingList.length; j++){
						if(room.meetingList[j].title == title){
							meeting = room.meetingList[j];
							break;
						}
					}
					break;
				}
			}

			var elemT = $(this).offset().top;
			var deskT = $('#desktop').offset().top;
			var top = elemT - deskT + $(this).height()/2;
			var point = {
				'top': top
			};
			showMeetingDetails(point, curroom.name, meeting);

		});
		
		// scroll to bottom
		$('#chatPanel .messages').scrollTop(top-$('#chatPanel .messages').height())
		


		// flag a message
		$('.chat_msg_item .flag_off').hide();

		$('.chat_msg_item .msg').off('mouseover');
		$('.chat_msg_item .msg').off('mouseout');

		$('.chat_msg_item .msg').on('mouseover', function(evt) {
			evt.stopPropagation();
			if(!$(this).parent().parent().find('.flag_on').is(':visible')){
				$(this).parent().parent().find('.flag_off').show();
			}
			$(this).css('background-color', 'rgba(0,0,0,0.04)');
		});	

		$('.chat_msg_item .msg').on('mouseout', function(evt) {
			evt.stopPropagation();
			if(!$(this).hitTest(evt.pageX, evt.pageY) && !$(this).parent().parent().find('.flag').hitTest(evt.pageX, evt.pageY)){
				$(this).parent().parent().find('.flag_off').hide();
				$(this).css('background-color', 'rgba(0,0,0,0)');
	    	}
			
		});


		$('.chat_msg_item .flag_off').attr('tooltip', 'Flag for follow-up');
		regTooltip($('.chat_msg_item .flag_off'), 'down');

		$('.chat_msg_item .flag_on').attr('tooltip', 'Unflag');
		regTooltip($('.chat_msg_item .flag_on'), 'down');


		$('.chat_msg_item .flag_off').off('click');
		$('.chat_msg_item .flag_on').off('click');

		$('.chat_msg_item .flag_off').on('click', function(evt) {
			evt.stopPropagation();
			var msgid = $(this).attr('msg-id');
			for(var i=room_list.length-1; i>=0; i--){
				var itm = room_list[i];
				if(itm.id == selectedRoomListId){
					for(var k in itm.chatMsg){
						if(itm.chatMsg[k].id == msgid){
							itm.chatMsg[k].flag = true;
							itm.chatMsg[k].flagtime = moment().format('h:mm');
							$(this).hide();
							$(this).parent().parent().find('.flag_on').show();
							break;
						}
					}
					break;
				}
			}
		});	

		$('.chat_msg_item .flag_on').on('click', function(evt) {
			evt.stopPropagation();
			var msgid = $(this).attr('msg-id');
			for(var i=room_list.length-1; i>=0; i--){
				var itm = room_list[i];
				if(itm.id == selectedRoomListId){
					for(var k in itm.chatMsg){
						if(itm.chatMsg[k].id == msgid){
							itm.chatMsg[k].flag = false;
							$(this).hide();
							$(this).parent().parent().find('.flag_off').show();
							break;
						}
					}
					break;
				}
			}
		});	


		// contact card
		$('#msg_list_wrapper .avatar').off('mouseover');
		$('#msg_list_wrapper .avatar').on('mouseover', function(evt){
			evt.stopPropagation();
			var peoplename = $(this).attr('people');
			if(!peoplename){
				return;
			}

			var elemL = $(this).offset().left;
			var elemT = $(this).offset().top;
			var deskL = $('#desktop').offset().left;
			var deskT = $('#desktop').offset().top;
			var top = elemT - deskT + $(this).height()/2;
			var left = elemL - deskL;
			var point = {
				'top': top,
				'left': left
			};

			var ref = $(this);
			var tmo_id = setTimeout(function(){
				showContactCard(peoplename, 'right', point, ref);
			}, 500)

			$(this).attr('tmo_id', tmo_id);
		});

		$('#msg_list_wrapper .avatar').off('mouseout');
		$('#msg_list_wrapper .avatar').on('mouseout', function(evt){
			evt.stopPropagation();
			var tmo_id = $(this).attr('tmo_id');
			clearTimeout(tmo_id)
		});
		
	}

	
	
	function disableChatInput(){
		$('#chat-input-wrap').css('opacity', 0.5);
		$('#chat-input-wrap').addClass('disabled');
		
		$('#chat-input-wrap-dark').css('opacity', 0.5);
		$('#chat-input-wrap-dark').addClass('disabled');
	}
	
	function enableChatInput(){
		$('#chat-input-wrap').css('opacity', 1);
		$('#chat-input-wrap').removeClass('disabled');
		
		$('#chat-input-wrap-dark').css('opacity', 1);
		$('#chat-input-wrap-dark').removeClass('disabled');
	}
	
	var chatInputBindingRoomID;
	var new_chat_spacename;
	var new_chat_peoplelist;
	function bindChatInputToRoom(peoplelist, roomname){

		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(peoplelist.length == 1 && itm.name == peoplelist[0]){
				chatInputBindingRoomID = itm.id;
				return;
			}else if(peoplelist.length > 1 && peoplelist.length == itm.people.length){
				var match = true;
				for(var j=0; j<peoplelist.length; j++){
					var p = peoplelist[j];
					if(itm.people.indexOf(p) == -1){
						match = false;
						break;
					}
					if(roomname == undefined || roomname == ''){
						var firstname = p.split(' ')[0];
						if(itm.name.indexOf(firstname) == -1){
							match = false;
							break;
						}
					}
				}
				if(roomname != undefined && roomname != '' && roomname != itm.name){
					match = false;
				}
				if(match){
					chatInputBindingRoomID = itm.id;
					return;
				}
			}
		}


		// create new space
		var spaceName;
		if(peoplelist.length > 1){
			var firstnameLst = [];
			for(var j=0; j<peoplelist.length; j++){
				var p = peoplelist[j];
				var firstname = p.split(' ')[0];
				firstnameLst.push(firstname);
			}

			spaceName = firstnameLst.join(', ');
		}else{
			spaceName = peoplelist[0];
		}
		
		if(roomname != undefined && roomname != ''){
			spaceName = roomname;
		}

		var newSpaceItem = createNewSpace('space', spaceName, peoplelist);

		if(incall_room_id){
			// second item
			room_list.splice(1, 0, newSpaceItem);
		}else{
			// first item
			room_list.unshift(newSpaceItem);
		}

		chatInputBindingRoomID = newSpaceItem.id;

		createRoomList();

	}
	

	
	
	// -----------------------------------
	//             hot key
	// -----------------------------------
	var user_test_room_id = 1;
	var otbp_triggered_times = 0;
	$('.obtp_toast').hide();

	$('body').on('keydown',function(event){
		console.log(event.keyCode);
		
				
	    if(event.keyCode == "49" && window.user_test_flow_id == 2) { // 1. //070617 Fi disable OBTP in day1 scenario
	        // show in call time
	        if(otbp_triggered_times < 1){

	        	otbp_triggered_times++;

	        	if(otbp_triggered_times == 2){
	        		user_test_room_id = 3;
	        	}

	        	if(inSearchView){
	        		cancelSearch();
	        	}
	        	
	        	$('.obtp_toast').fadeIn();
		        setOBTPRoom(true);

		        // set incall
		        for(var i=room_list.length-1; i>=0; i--){
					var itm = room_list[i];
					if(itm.id == user_test_room_id){
						$('.obtp_toast .title').text(itm.interstitialPage.meetingTitle);
						room_list[i].incall	 = true;
						break;
					}
				}

				// start timer
				startInCallTimer(user_test_room_id);

		        sortRoomListItem();

				//play sound
				$('.obtp_toast .sound').html('<audio id="meeting_call" src="'+resourceUrl+'/asset/sound/meeting_call.m4a"></audio>');
				var audio = document.getElementById('meeting_call');
	    		audio.play();

	        }
	        

		     	        
	    } else if(event.keyCode == "50" && window.user_test_flow_id == 1) { // press 2 to enter day 2
	    
	    	window.user_test_flow_id = 2;
	    	
	    	$('#email').hide();
	    	$('#getApp').hide();
	    	$('#signFlow').hide();
	    	$('#mainframe').show();

	    	FTEstarted = false;
			FTEcompleted = true;
	    	
			
			team_list = team_list_all.slice();
			room_list = getSpaceList(room_list_day2);
			createRoomList();

			selectRoom(user_test_room_id);
			showActPanel('chat');

			$('.lb_todaysMeeting').text('1 meeting today');

			
	    } else if (event.keyCode == "27"){ //ESC - skip sign in flow
	    	
	    	if(window.signin == false){
	    		$('#email').hide();
				$('#getApp').hide();
				$('#mainframe').show();
				hideSignFlow();
	    	}
			
	    } else if (event.keyCode == "80"){ //Alt+P : Automatic device pairing connection
	    	
	    	if(event.altKey){
	    		showAutoDevicePaired(false);
	    	}
			
	    } else if (event.keyCode == "48"){ // Key 0 : mute

	    	stopAllSounds();

	    } else if (event.keyCode == "83"){ //Alt+S : Others start/stop sharing
	    	
	    	if(event.altKey){
	    		if(others_is_sharing){
	    			othersStopSharing();
	    		}else{
	    			othersStartSharing();
	    		}
	    	}
			
	    } 
	    
	    
	    
	}); 
	
	
	function setOBTPRoom(transition){

		var fator = 1;
		if(!transition){
			fator = 0;
		}
		
        $('#room-'+user_test_room_id+' .in_call_time').fadeIn(200*fator); //062117 Fi Changed to Brandon and Emma room per spec request, still need to jump to top
        $('#room-'+user_test_room_id+' .ico_ppl').delay(1000*fator).fadeIn(200*fator);
        $('#room-'+user_test_room_id+' .ico_ppl').css('z-index', '999');

        //shrunken head counter
        setOBTProster(1, false);
        setTimeout(function(){
        	setOBTProster(2, false);
        }, 2000*fator);
        setTimeout(function(){
        	setOBTProster(3, false);
        }, 4000*fator);

		$('#room-'+user_test_room_id+' .ico_mention').css('opacity', 0);
       
      	//show roster on mouseover
		$('#room-'+user_test_room_id+' .ico_ppl').on('mouseover', function(evt){
			evt.stopPropagation();
			$('.roster').show();
	
		});
		$('#room-'+user_test_room_id+' .ico_ppl').on('mouseout', function(evt){
			evt.stopPropagation();
			$('.roster').hide();
	
		});
	}

	function setOBTProster(cnt, joined){
		var num = $('.roster_ico .lb').text();
		if(num > cnt){
			return;
		}

		$('#room-'+user_test_room_id+' .ico_ppl .people_cnt').text(cnt);
		$('.roster_ico .lb').text(cnt);

		var people;
		var roomid;
		var num = cnt;

		var len = room_list.length;
		for(var i=0; i<len; i++){
			var room = room_list[i];
			if(room.id == user_test_room_id){
				roomid = room.id;
				people = room.people;
				break;
			}
		}

		//people		
		var listhtml = '';

		if(joined){
			var selfinfo = people_list[self_name];				
			listhtml += '<div class="listitem " >';
			listhtml += '<div class="avatar" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + selfinfo.avatar + '"></div>';
			listhtml += '<div class="label">' + self_name + '</div>';
			listhtml += '</div>';
			cnt--;
		}
		
		var len = people.length;
		for(var j=0; j<len; j++){
			var pname = people[j];
			var p = people_list[pname];
			if(pname != self_name && cnt>0){
				listhtml += '<div class="listitem " >';
				listhtml += '<div class="avatar" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + p.avatar + '"></div>';
				listhtml += '<div class="label">' + pname + '</div>';
				listhtml += '</div>';
				cnt--;
			}
		}

		$('.roster .list').html(listhtml);

		var h = num * $('.roster .list .listitem').height();
		$('.roster .list').height(h);

	}


	var iphone_ring;
	function playRingtone(){
		//play sound
		$('#iphone .sound').html('<audio id="iphone_ringtone" loop="loop" src="'+resourceUrl+'/asset/sound/iphone_ringtone.mp3"></audio>');
		iphone_ring = document.getElementById('iphone_ringtone');
    	iphone_ring.play();
	}


	var people_talking;
	function playPeopleTalking(){

		return;


		//play sound
		var html = '<audio id="people_talking" loop="loop" src="'+resourceUrl+'/asset/sound/people_talking.m4a"></audio>';
		if($('#people_talking').length == 0){
			$('body').append(html);
		}
		people_talking = document.getElementById('people_talking');
		setTimeout(function () {
    	people_talking.play();
    	}, 2000);
	}


	function stopAllSounds(){
		if(people_talking){
			people_talking.pause();
		}
	}

	
	
	// -----------------------------------
	//          create flow
	// -----------------------------------

	
	// create + menu
	$('#create_menu').hide();
	$('#create_menu .btn_chat').on('click', function(evt){
		
		createFlowChat();
		
		$('#create_menu').hide();

	});
	$('#create_menu .btn_call').on('click', function(evt){
		
		createFlowCall();
		
		$('#create_menu').hide();

	});
	$('#create_menu .btn_schedule').on('click', function(evt){
		
		createFlowSchedule('plusbutton');
		
		$('#create_menu').hide();

	});
	$('#create_menu .btn_space').on('click', function(evt){
		
		createFlowSpace();
		
		$('#create_menu').hide();

	});


	// + balls 
	
	// chat

	function createFlowChat(){

		resetCreatePanel();
		
		$('#messageSomeoneFlow').show();
		$('#createPanel').fadeIn();
		
		disableChatInput();
		$('#chat-input-wrap-dark').css('z-index', 99);

		// 
		$('#messageSomeoneFlow').show();
		$('#messageSomeoneFlow .pp').hide();
		$('#messageSomeoneFlow .p1').show();
		$('#messageSomeoneFlow .pp .pop1').show();
		$('#messageSomeoneFlow .pp .pop2').hide();


		$('.input_people').val('');

		setTimeout(function(){
			$('#messageSomeoneFlow .p1 .input_people').focus();
		}, 10);

		$('#messageSomeoneFlow .p1 .input_people').off('input');
		$('#messageSomeoneFlow .p1 .input_people').on('input', function(evt){
			// on input text changed
			if($('#messageSomeoneFlow .p1 .input_people').val().toLowerCase().indexOf('l') == 0){
				$('#messageSomeoneFlow .p1 .pop1').hide();
				$('#messageSomeoneFlow .p1 .pop2').show();
			}
	
		});

		$('#messageSomeoneFlow .p2 .input_people').off('input');
		$('#messageSomeoneFlow .p2 .input_people').on('input', function(evt){
			// on input text changed
			if($('#messageSomeoneFlow .p2 .input_people').val().toLowerCase().indexOf('b') == 0){
				$('#messageSomeoneFlow .p2 .pop1').hide();
				$('#messageSomeoneFlow .p2 .pop2').show();
			}
	
		});
		
		
		$('#messageSomeoneFlow .p1 .btn').on('click', function(evt){
			evt.stopPropagation();
			
			$('#messageSomeoneFlow .p2').show();
			$('#messageSomeoneFlow .p1').hide();

			$('#messageSomeoneFlow .p2 .input_people').focus();
			
			enableChatInput()

			new_chat_peoplelist = ["Linda Sinu"];
			new_chat_spacename = '';
			
		});

		$('#messageSomeoneFlow .p2 .btn').on('click', function(evt){
			evt.stopPropagation();
			
			$('#messageSomeoneFlow .p3').show();
			$('#messageSomeoneFlow .p2').hide();

			$('#messageSomeoneFlow .p3 .input_people').focus();

			new_chat_peoplelist = ["Linda Sinu", "Brandon Smith"];
			new_chat_spacename = '';

		});
	
		
		
		$('.dark-input-box').on('input', function(evt){
			// on input text changed
			if($('.dark-input-box').val().length > 0){
				new_chat_spacename = $('#messageSomeoneFlow .p3 .input_name').val();
			}
	
		});

		
		
	};
	
	// call
	var phoneCallNumber;
	function createFlowCall(){

		resetCreatePanel();
	
		
		$('#createPanel').fadeIn();

		// 
		$('#callSomeoneFlow').show();
		$('#callSomeoneFlow .p1').show();
		$('#callSomeoneFlow .p2').hide();
		$('#callSomeoneFlow .p2callnumber').hide();
		$('#callSomeoneFlow .p1 .pop1').show();
		$('#callSomeoneFlow .p1 .pop2').hide();
		$('#callSomeoneFlow .p1 .pop3').hide();
		$('#callSomeoneFlow .p1 .pop2 .itm').css('opacity', 0);
		
		$('.newcall-input-box').val('');

		setTimeout(function(){
			$('#callSomeoneFlow .p1 .newcall-input-box').focus();
		}, 10);

		$('.newcall-input-box').on('input', function(evt){
			// on input text changed
			if($('.newcall-input-box').val().toLowerCase().indexOf('l') == 0){
				$('#callSomeoneFlow .p1 .pop1').hide();
				$('#callSomeoneFlow .p1 .pop2').show();
				$('#callSomeoneFlow .p1 .pop3').hide();
			}
			if($('.newcall-input-box').val().toLowerCase().indexOf('4') == 0){
				$('#callSomeoneFlow .p1 .pop1').hide();
				$('#callSomeoneFlow .p1 .pop3').show();
				$('#callSomeoneFlow .p1 .pop2').hide();
			}
	
		});

		
		$('#callSomeoneFlow .newcall-input-box').off('keydown');
		$('#callSomeoneFlow .newcall-input-box').on('keydown',function(evt){
			evt.stopPropagation();
		    if(evt.keyCode == "13") { // enter
		    	if( $.trim($('#callSomeoneFlow .newcall-input-box').val()) != '' ){
		    		var num1 = $.trim($('#callSomeoneFlow .newcall-input-box').val())
		    		num = num1.replace(/[^0-9]/ig, '');
		    		if(num == ''){
		    			return
		    		}
		    		num = num.split('');
		    		if(num.length == 11){
		    			num.splice(7, 0, '-');
		    			num.splice(4, 0, '-');
		    			num.splice(1, 0, ' ');
		    			num = num.join('');
		    			num = '+'+num;
		    		}else if(num.length == 10){
		    			num.splice(6, 0, '-');
		    			num.splice(3, 0, '-');
		    			num = num.join('');
		    			num = '+1 '+num;
		    		}else{
		    			num = num1
		    		}
		    		phoneCallNumber = num;

		    		$('#callSomeoneFlow .p2callnumber .phoneNum').text(phoneCallNumber);
					$('#callSomeoneFlow .p2callnumber').show();
					$('#callSomeoneFlow .p1').hide();
		    	}
		    }
		}); 
		
		
		$('#callSomeoneFlow .p1 .pop2 .btn').on('click', function(evt){
			evt.stopPropagation();
			
			$('#callSomeoneFlow .p2').show();
			$('#callSomeoneFlow .p1').hide();

		});

		
		$('#callSomeoneFlow .p1 .pop3 .btn1').on('click', function(evt){
			evt.stopPropagation();
			phoneCallNumber = $('#callSomeoneFlow .p1 .pop3 .num1').text();
			$('#callSomeoneFlow .p2callnumber .phoneNum').text(phoneCallNumber);
			$('#callSomeoneFlow .p2callnumber').show();
			$('#callSomeoneFlow .p1').hide();
		});
		$('#callSomeoneFlow .p1 .pop3 .btn2').on('click', function(evt){
			evt.stopPropagation();
			phoneCallNumber = $('#callSomeoneFlow .p1 .pop3 .num2').text();
			$('#callSomeoneFlow .p2callnumber .phoneNum').text(phoneCallNumber);
			$('#callSomeoneFlow .p2callnumber').show();
			$('#callSomeoneFlow .p1').hide();
		});
		
		$('#callSomeoneFlow .p1 .itm').on('mouseover', function(evt){			
			$(this).css('opacity', 1)

		});
		
		$('#callSomeoneFlow .p1 .itm').on('mouseout', function(evt){
			$(this).css('opacity', 0)

		});
		
		
		$('#callSomeoneFlow .p2 .btn_audio').on('click', function(evt){
			evt.stopPropagation();
			
			gotoSpaceAndCall("Linda Sinu", 'audio_only');

		});
		$('#callSomeoneFlow .p2callnumber .btn_audio').on('click', function(evt){
			evt.stopPropagation();

			createNewSpace('phone', phoneCallNumber, []);
			gotoSpaceAndCall(phoneCallNumber, 'audio_only');

		});

		$('#callSomeoneFlow .p2 .btn_video').on('click', function(evt){
			evt.stopPropagation();
			
			gotoSpaceAndCall("Linda Sinu");

		});
		
		
	};
	
	// schedule
	var newFlowInputPeopleTagList = [];
	var newFlowInputSpaceName = '';
	var newFlowSearchInputId;

	$('#outlook').hide();

	function createFlowSchedule(fromwhere){

		resetCreatePanel();
		
		newFlowInputPeopleTagList = [];
		newFlowInputSpaceName = '';

		$('#scheduleFlow .form').html('');
		$('#scheduleFlow .open_outlook').hide();

		$('#scheduleFlow .btn_sch').removeClass('button_blue');
		$('#scheduleFlow').show();
		$('#createPanel').fadeIn();


		if(fromwhere == 'inspace'){
			for(var i=room_list.length-1; i>=0; i--){
				var itm = room_list[i];
				if(itm.id == selectedRoomListId){

					newFlowInputSpaceName = itm.name;
					$('#scheduleFlow .btn_sch').addClass('button_blue');
					$('#scheduleFlow .btn_sch').click();

					return;
				}
			}
		}

		var html = '';
		html += '<label>Add people</label>';
		html += '<div class="inputwrap inputwrap_people">';
		html += '<input class="common-input-box input_people" type="text" placeholder="" value="">';
		html += '</div>';

		html += '<label>Add a space</label>';
		html += '<div class="inputwrap inputwrap_space">';		
		html += '<input class="common-input-box input_space" type="text" placeholder="Add space    Ex. Friday food group" value="">';
		html += '<div class="suffix" style="display:none;">@spark</div>';
		html += '</div>';

		html += '<label>What is your meeting about? (optional)</label>';
		html += '<div class="inputwrap">';
		html += '<input class="common-input-box input_topic" type="text" placeholder="Meeting topic (optional)   Ex. Food truck this week? " value="">';
		html += '</div>';

		$('#scheduleFlow .form').append($(html));


		$('#scheduleFlow .input_people').tagsInput({
			//'height':'30px',
			'width':'100%',
			'interactive':true,
			'textColor':'#000000',
			'placeholderColor':'rgba(0,0,0,0.6)',
			'defaultText':'',
			'onAddTag':onAddTag,
			'onRemoveTag':onRemoveTag,
			//'onChange' : callback_function,
			'removeWithBackspace' : true,
		});

		newFlowSearchInputId = $('#scheduleFlow .input_people').inputId() + '_tag';

		// people input
		$('#'+newFlowSearchInputId).css('min-width', '350px');
		$('#'+newFlowSearchInputId).attr('placeholder', 'Search for people by name or email address');
		$('#scheduleFlow .input_people').importTags('');

		$('#'+newFlowSearchInputId).off('focus');
		$('#'+newFlowSearchInputId).on('focus', function(evt){
			setAutoCompleteDropdown();
		});

		$('#'+newFlowSearchInputId).off('blur');
		$('#'+newFlowSearchInputId).on('blur', function(evt){
			if( $('#scheduleFlow .autocomplete_dropdown').length && $('#scheduleFlow .autocomplete_dropdown').hitTest(mouseX, mouseY) ){
				return;
	    	}
			$('#scheduleFlow .autocomplete_dropdown').remove();
		});

		$('#'+newFlowSearchInputId).off('input');
		$('#'+newFlowSearchInputId).on('input', function(evt){
			// on input text changed
			setAutoCompleteDropdown();
		});


		//space input
		$('#scheduleFlow .input_space').off('focus');
		$('#scheduleFlow .input_space').on('focus', function(evt){
			setSuggestedSpace();
		});

		$('#scheduleFlow .input_space').off('blur');
		$('#scheduleFlow .input_space').on('blur', function(evt){
			if( $('#scheduleFlow .autocomplete_dropdown').length && $('#scheduleFlow .autocomplete_dropdown').hitTest(mouseX, mouseY) ){
				return;
	    	}
			$('#scheduleFlow .autocomplete_dropdown').remove();

		});

		$('#scheduleFlow .input_space').off('input');
		$('#scheduleFlow .input_space').on('input', function(evt){
			// on input text changed

			if( $.trim($('#scheduleFlow .input_space').val()) != '' ){
				$('#scheduleFlow .autocomplete_dropdown').remove();

				var width = $('#scheduleFlow .inputwrap_space').width()-2;
				var height = $('#scheduleFlow .inputwrap_space').height();

				var top = height + 4;

				var deshtml = '';
				deshtml += '<div class="autocomplete_dropdown commonlist" style="width:'+width+'px; top:'+top+'px; left:0px; ">'
				deshtml += "<div class='listdes'>You will create a new space called '"+$('#scheduleFlow .input_space').val()+"' after you hit return.</div>";
				deshtml += '</div>';

				$('#scheduleFlow .inputwrap_space').append($(deshtml));

			}else{
				setSuggestedSpace();
			}
			

		});

		$('#scheduleFlow .input_space').off('keydown');
		$('#scheduleFlow .input_space').on('keydown',function(evt){
			evt.stopPropagation();
		    if(evt.keyCode == "13") { // enter
		    	if( $.trim($('#scheduleFlow .input_space').val()) != '' ){
		    		$('#scheduleFlow .inputwrap_space .suffix').show();
		    		$('#scheduleFlow .autocomplete_dropdown').remove();
		    		newFlowInputSpaceName = '';
		    	}
		    }
		}); 



		function setAutoCompleteDropdown(){
			var searchValue = $.trim($('#'+newFlowSearchInputId).val());
			searchValue = searchValue.toLowerCase();
			$('#'+newFlowSearchInputId).css('min-width', '0px');
			$('#'+newFlowSearchInputId).attr('placeholder', '');

			$('#scheduleFlow .autocomplete_dropdown').remove();

			var html = '';
			var listhtml = '';

			if(searchValue.length > 0){
				for(var peoplename in people_list){
					var p = people_list[peoplename];
					var avatar = p.avatar;

					if(newFlowInputPeopleTagList.indexOf(peoplename) >= 0 || peoplename == self_name){
						continue;
					}

					var hl_name = '';
					var found = false;
					var name_arr = peoplename.split(' ');
					for(var k=0; k<name_arr.length; k++){
						var str = name_arr[k];
						if(str.toLowerCase().indexOf(searchValue) == 0){
							var hl = str.substr(0, searchValue.length);
							str = '<b>'+hl+'</b>'+str.substr(hl.length);
							found = true;
						}
						hl_name += str+' ';
					}
					if(!found){
						continue;
					}

					listhtml += '<div class="listitem menuitm" data-type="people" data-name="'+peoplename+'">';
					listhtml += '<div class="avatar" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + avatar + '"></div>';
					listhtml += '<div class="label">' + hl_name + '</div>';
					listhtml += '</div>';

				}


			}else if(newFlowInputPeopleTagList.length == 0){
				// show suggested people

				var suggested_people = ['Brandon Smith', 'Emma Hirst', 'George Edwards'];
				
				listhtml += '<div class="listdes">Suggested people</div>';

				for(var i=0; i<suggested_people.length; i++){
					var peoplename = suggested_people[i];
					var p = people_list[peoplename];
					var avatar = p.avatar;

					var hl_name = peoplename;

					listhtml += '<div class="listitem menuitm" data-type="people" data-name="'+peoplename+'">';
					listhtml += '<div class="avatar" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + avatar + '"></div>';
					listhtml += '<div class="label">' + hl_name + '</div>';
					listhtml += '</div>';

				}
			}

			if(listhtml.length > 0){
				var width = $('#scheduleFlow .inputwrap_people').width()-2;
				var height = $('#scheduleFlow .inputwrap_people').height();

				var top = height + 4;
				
				html += '<div class="autocomplete_dropdown commonlist" style="width:'+width+'px; top:'+top+'px; left:0px; ">'
				html += listhtml;
				html += '</div>';

				$('#scheduleFlow .inputwrap_people').append($(html));
			}



			$('#scheduleFlow .inputwrap_people .autocomplete_dropdown .listitem').off('click');
			$('#scheduleFlow .inputwrap_people .autocomplete_dropdown .listitem').on('click', function(evt){
				evt.stopPropagation();

				var name = $(this).attr('data-name');

				if($(this).attr('data-type') == 'people'){
					newFlowInputPeopleTagList.push(name);
					if(newFlowInputSpaceName.length > 0){
						$('#scheduleFlow .input_people').removeTag(newFlowInputSpaceName);
					}
				}else if($(this).attr('data-type') == 'space'){
					//$('#scheduleFlow .input_people').importTags('');
					//newFlowInputPeopleTagList = [];
					newFlowInputSpaceName = name;
				}

				$('#scheduleFlow .input_people').addTag(name);
				$('#scheduleFlow .autocomplete_dropdown').remove();

				

				setTimeout(function(){
					$('#'+newFlowSearchInputId).focus();
					if(newFlowInputPeopleTagList.length > 1){
						setSuggestedSpace();
					}
				}, 10);

				

			});
		}

		
		function setSuggestedSpace(){

			$('#scheduleFlow .autocomplete_dropdown').remove();

			var tmplist = room_list.slice();
			tmplist.sort(function(a,b){
				return a.name > b.name;
			});

			if(newFlowInputPeopleTagList.length > 1){ //121317 Fi  updated per Sharon's request (only show sugest list when there are more than one person)
				var len = tmplist.length;
				var listhtml = '';
				var html = '';
				for(var i=0; i<len; i++){
					var room = tmplist[i];

					var id = room.id;
					var name = room.name;
					var type = room.type;
					var people = room.people;

					if(type == 'space'){
						var found = true;
						for(var k=0; k<newFlowInputPeopleTagList.length; k++){
							var p = newFlowInputPeopleTagList[k];
							if(people.indexOf(p) == -1){
								found = false;
								break;
							}
						}

						if(found){
							listhtml += '<div class="listitem menuitm" data-type="space" data-name="'+name+'">';
							listhtml += '<div class="avatar">';
							listhtml += '<div class="txt">'+name[0].toUpperCase()+'</div>';
							listhtml += '</div>';
							listhtml += '<div class="label_line1">' + name + '</div>';
							if(people.length > 1){
								listhtml += '<div class="label_line2">' + people.length + ' space members</div>';
							}else{
								listhtml += '<div class="label_line2">1 space member</div>';
							}
							
							listhtml += '</div>';
						}

					}

				}

				if(listhtml.length > 0){ 

					listhtml = '<div class="listdes">Schedule this meeting in a shared space with these people:</div>' + listhtml;

					var width = $('#scheduleFlow .inputwrap_space').width()-2;
					var height = $('#scheduleFlow .inputwrap_space').height();

					var top = height + 4;
					
					html += '<div class="autocomplete_dropdown commonlist" style="width:'+width+'px; top:'+top+'px; left:0px; max-height:320px; overflow-y:auto;">'
					html += listhtml;
					html += '</div>';

					$('#scheduleFlow .inputwrap_space').append($(html));

					$('#scheduleFlow .inputwrap_space .autocomplete_dropdown .listitem').off('click');
					$('#scheduleFlow .inputwrap_space .autocomplete_dropdown .listitem').on('click', function(evt){
						evt.stopPropagation();
						var name = $(this).attr('data-name');

						newFlowInputSpaceName = name;
						$('#scheduleFlow .input_space').val(name);
						$('#scheduleFlow .inputwrap_space .suffix').show();

						$('#scheduleFlow .autocomplete_dropdown').remove();

					});
				}
			}
		}

		function onAddTag(tag){
			$('#scheduleFlow .btn_sch').addClass('button_blue');
		}
		function onRemoveTag(tag){
			var idx = newFlowInputPeopleTagList.indexOf(tag);
			if(idx >= 0){
				newFlowInputPeopleTagList.splice(idx, 1);
			}

			if(newFlowInputSpaceName == tag){
				newFlowInputSpaceName = '';
			}
			
			if(newFlowInputPeopleTagList.length == 0 && newFlowInputSpaceName.length == 0){
				$('#scheduleFlow .btn_sch').removeClass('button_blue');
			}

			setTimeout(function(){
				if(newFlowInputPeopleTagList.length > 1){
					setSuggestedSpace();
				}
			}, 10);
		}


	};


	function meetingScheduled(space, topic, people){
		// add new room to top
    	var should_add_new = true;

    	var time1 = scheduled_time1.format('YYYY-MM-DD HH:mm');
    	var time2 = scheduled_time2.format('YYYY-MM-DD HH:mm');

    	var newmeeting = {
    		title: topic,
    		time: time1+','+time2,
    		host: self_name,
    		des: 'In this meeting, Brandon and Maria are going to share some data about Spark with us. Hopefully we can start using both quantitative and qualitative data to create a better experience for Spark users. <br><br>Agenda:<br>1.  Team Space feedback - All (5 mins)<br>2.  Org change - Giacomo (10 mins)<br>3.  Design Brief - All (10 mins)<br>4.  Budgets - Melania (5 mins)',
    		people: people,
		}

		var date = new Date();
		var hour = date.getHours();
		var min = date.getMinutes();
		var suffix;
		if(hour < 12){
			suffix = 'AM'
		}else{
			hour -= 12;
			suffix = 'PM'
		}
		var time = hour+':'+min+' '+suffix;
		var chatmsg = {
			type:'scheduled_meeting', 
			name:'You', 
			time:time, 
			meeting:newmeeting
		};

		if(people.length == 1 && space == ''){
			for(var i=room_list.length-1; i>=0; i--){
				var itm = room_list[i];
				if(itm.name == people[0]){
					space = people[0];
					should_add_new = false;
					break;
				}
			}
		}

		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.name == space){
				should_add_new = false;
				break;
			}
		}


    	if(should_add_new){
    		var type;
    		if(people.length == 1){
    			type = 'people';
    		}else{
    			type = 'space';
    		}
    		var newSpaceName = '';
    		if(space != ''){
    			newSpaceName = space;
    		}else if(topic != '' && topic != 'Untitled Meeting'){
    			newSpaceName = topic;
    		}else{
    			if(people.length > 1){
    				var firstNameArr = [];
    				for(var i=0; i<people.length; i++){
	    				var pname = people[i];
	    				firstNameArr.push(pname.split(' ')[0]);
	    			}
	    			newSpaceName = firstNameArr.join(', ');
    			}else{
    				newSpaceName = people[0];
    			}
    		}
    		
    		var newSpaceItem = createNewSpace(type, newSpaceName, people);
    		newSpaceItem.meetingList.unshift(newmeeting);
			newSpaceItem.chatMsg.push(chatmsg);

			if(incall_room_id){
				// second item
				room_list.splice(1, 0, newSpaceItem);
			}else{
				// first item
				room_list.unshift(newSpaceItem);
			}

			createRoomList();

			setSpaceAttr(newSpaceItem.id, 'defaultPanel', 'schedule'); 
			setSpaceAttr(newSpaceItem.id, 'data-current-panel', 'schedule')
			selectRoom(newSpaceItem.id);

    	}else{

    		for(var i=room_list.length-1; i>=0; i--){
				var itm = room_list[i];
				if(itm.name == space){
					room_list[i].meetingList.unshift(newmeeting);
					room_list[i].chatMsg.push(chatmsg);

					setSpaceAttr(itm.id, 'defaultPanel', 'schedule'); 
					setSpaceAttr(itm.id, 'data-current-panel', 'schedule')
					selectRoom(itm.id);

					
					break;
				}
			}

    	}

    	dismissWaffleMenu();
		
		
	}


	$('#scheduleFlow .btn_sch').on('click', function(evt){
		evt.stopPropagation();

		if(!$(this).hasClass('button_blue')){
			return;
		}

		$('#scheduleFlow .input_people_div').remove();

		$('#scheduleFlow .open_outlook').show();
		$('#scheduleFlow .open_outlook .p2').hide();
		$('#scheduleFlow .open_outlook .p1').show();

		var space = '';
		var topic = '';
		var people = '';

		if(newFlowInputSpaceName.length > 0){
			space = newFlowInputSpaceName;
		}else{
			space = $('#scheduleFlow .input_space').val();
		}

		setTimeout(function(){
			$('#scheduleFlow .open_outlook .p1').hide();
			$('#scheduleFlow .open_outlook .p2').show();

			topic = $('#scheduleFlow .input_topic').val();

			if(newFlowInputPeopleTagList.length > 0){
				people = newFlowInputPeopleTagList;
				if(topic.length == 0){
					if(space != ''){
						topic = space;
					}else{
						topic = 'Untitled Meeting';
					}
				}
			}else{
				var len = room_list.length;
				for(var i=0; i<len; i++){
					var room = room_list[i];
					var name = room.name;
					if(newFlowInputSpaceName == name){
						people = room.people;
						if(topic == undefined || topic.length == 0){
							topic = name;
						}
						break;
					}
				}
			}

			

			$('#outlook .lb_date1').text(scheduled_time1.format('DD/MM/YYYY'));
    		$('#outlook .lb_date2').text(scheduled_time2.format('DD/MM/YYYY'));
    		$('#outlook .lb_time1').text(scheduled_time1.format('h:mm A'));
    		$('#outlook .lb_time2').text(scheduled_time2.format('h:mm A'));

			$('#outlook .lb_topic').val(topic);
			$('#outlook .lb_people').text(people.join('; '));
			$('#outlook').show();


		}, 2000);

		$('#outlook .btn_send').off('click');
		$('#outlook .btn_send').on('click', function(evt){
			evt.stopPropagation();

			$('#outlook').hide();
			$('#createPanel').fadeOut(100);
			topic = $('#outlook .lb_topic').val();	
			meetingScheduled(space, topic, people);

		});

	});


	$('#scheduleFlow .open_outlook .btn_got').on('click', function(evt){
		evt.stopPropagation();

		$('#createPanel').fadeOut(100);

	});




	//New Space Flow ------------------------

	function createFlowSpace(){

		resetCreatePanel();
		
		newFlowInputPeopleTagList = [];
		newFlowInputSpaceName = '';

		$('#newSpaceFlow .form').html('');
		$('#newSpaceFlow .open_outlook').hide();

		$('#newSpaceFlow .btn_create').removeClass('button_blue');
		$('#newSpaceFlow').show();
		$('#createPanel').fadeIn();


		var html = '';

		html += '<div class="inputwrap inputwrap_space">';
		html += '<input class="common-input-box input_space" type="text" placeholder="Space name" value="">';
		html += '</div>';

		html += '<div class="inputwrap inputwrap_people">';
		html += '<input class="common-input-box input_people" type="text" placeholder="" value="">';
		html += '</div>';

		$('#newSpaceFlow .form').append($(html));


		$('#newSpaceFlow .avatar').attr('tooltip', 'Upload space avatar');
		regTooltip($('#newSpaceFlow .avatar'), 'up');	


		$('#newSpaceFlow .input_people').tagsInput({
			//'height':'30px',
			'width':'100%',
			'interactive':true,
			'textColor':'#000000',
			'placeholderColor':'rgba(0,0,0,0.6)',
			'defaultText':'',
			'onAddTag':onAddTag,
			'onRemoveTag':onRemoveTag,
			//'onChange' : callback_function,
			'removeWithBackspace' : true,
		});

		newFlowSearchInputId = $('#newSpaceFlow .input_people').inputId() + '_tag';

		// people input
		$('#'+newFlowSearchInputId).css('min-width', '350px');
		$('#'+newFlowSearchInputId).attr('placeholder', 'Add people by name or email address (optional)');
		$('#newSpaceFlow .input_people').importTags('');

		$('#'+newFlowSearchInputId).off('focus');
		$('#'+newFlowSearchInputId).on('focus', function(evt){
			setAutoCompleteDropdown();
		});

		$('#'+newFlowSearchInputId).off('blur');
		$('#'+newFlowSearchInputId).on('blur', function(evt){
			if( $('#newSpaceFlow .autocomplete_dropdown').length && $('#newSpaceFlow .autocomplete_dropdown').hitTest(mouseX, mouseY) ){
				return;
	    	}
			$('#newSpaceFlow .autocomplete_dropdown').remove();
		});

		$('#'+newFlowSearchInputId).off('input');
		$('#'+newFlowSearchInputId).on('input', function(evt){
			// on input text changed
			setAutoCompleteDropdown();
		});


		//space input
		$('#newSpaceFlow .input_space').off('focus');
		$('#newSpaceFlow .input_space').on('focus', function(evt){
			setSuggestedSpace();
		});

		$('#newSpaceFlow .input_space').off('blur');
		$('#newSpaceFlow .input_space').on('blur', function(evt){
			if( $('#newSpaceFlow .autocomplete_dropdown').length && $('#newSpaceFlow .autocomplete_dropdown').hitTest(mouseX, mouseY) ){
				return;
	    	}
			$('#newSpaceFlow .autocomplete_dropdown').remove();

		});

		$('#newSpaceFlow .input_space').off('input');
		$('#newSpaceFlow .input_space').on('input', function(evt){
			// on input text changed
			var txt = $.trim($('#newSpaceFlow .input_space').val());
			if(txt.length > 0){
				$('#newSpaceFlow .btn_create').addClass('button_blue');
			}else{
				$('#newSpaceFlow .btn_create').removeClass('button_blue');
			}
		});

		$('#newSpaceFlow .input_space').off('keydown');
		$('#newSpaceFlow .input_space').on('keydown',function(evt){
			evt.stopPropagation();
		}); 



		function setAutoCompleteDropdown(){
			var searchValue = $.trim($('#'+newFlowSearchInputId).val());
			searchValue = searchValue.toLowerCase();
			$('#'+newFlowSearchInputId).css('min-width', '0px');
			$('#'+newFlowSearchInputId).attr('placeholder', '');

			$('#newSpaceFlow .autocomplete_dropdown').remove();

			var html = '';
			var listhtml = '';

			if(searchValue.length > 0){
				for(var peoplename in people_list){
					var p = people_list[peoplename];
					var avatar = p.avatar;

					if(newFlowInputPeopleTagList.indexOf(peoplename) >= 0 || peoplename == self_name){
						continue;
					}

					var hl_name = '';
					var found = false;
					var name_arr = peoplename.split(' ');
					for(var k=0; k<name_arr.length; k++){
						var str = name_arr[k];
						if(str.toLowerCase().indexOf(searchValue) == 0){
							var hl = str.substr(0, searchValue.length);
							str = '<b>'+hl+'</b>'+str.substr(hl.length);
							found = true;
						}
						hl_name += str+' ';
					}
					if(!found){
						continue;
					}

					listhtml += '<div class="listitem menuitm" data-type="people" data-name="'+peoplename+'">';
					listhtml += '<div class="avatar" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + avatar + '"></div>';
					listhtml += '<div class="label">' + hl_name + '</div>';
					listhtml += '</div>';

				}



			}else if(newFlowInputPeopleTagList.length == 0){
				// show suggested people

				var suggested_people = ['Brandon Smith', 'Emma Hirst', 'George Edwards'];
				
				listhtml += '<div class="listdes">Suggested people</div>';

				for(var i=0; i<suggested_people.length; i++){
					var peoplename = suggested_people[i];
					var p = people_list[peoplename];
					var avatar = p.avatar;

					var hl_name = peoplename;

					listhtml += '<div class="listitem menuitm" data-type="people" data-name="'+peoplename+'">';
					listhtml += '<div class="avatar" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + avatar + '"></div>';
					listhtml += '<div class="label">' + hl_name + '</div>';
					listhtml += '</div>';

				}
			}

			if(listhtml.length > 0){
				var width = $('#newSpaceFlow .inputwrap_people').width()-2;
				var height = $('#newSpaceFlow .inputwrap_people').height();

				var top = height + 4;
				
				html += '<div class="autocomplete_dropdown commonlist" style="width:'+width+'px; top:'+top+'px; left:0px; ">'
				html += listhtml;
				html += '</div>';

				$('#newSpaceFlow .inputwrap_people').append($(html));
			}



			$('#newSpaceFlow .inputwrap_people .autocomplete_dropdown .listitem').off('click');
			$('#newSpaceFlow .inputwrap_people .autocomplete_dropdown .listitem').on('click', function(evt){
				evt.stopPropagation();

				var name = $(this).attr('data-name');

				if($(this).attr('data-type') == 'people'){
					newFlowInputPeopleTagList.push(name);
					if(newFlowInputSpaceName.length > 0){
						$('#newSpaceFlow .input_people').removeTag(newFlowInputSpaceName);
					}
				}

				$('#newSpaceFlow .input_people').addTag(name);
				$('#newSpaceFlow .autocomplete_dropdown').remove();

				

				setTimeout(function(){
					$('#'+newFlowSearchInputId).focus();
					if(newFlowInputPeopleTagList.length > 1){
						setSuggestedSpace();
					}
				}, 10);

				

			});
		}

		
		function setSuggestedSpace(){

			// do not show suggested space...

		}

		function onAddTag(tag){
			//$('#newSpaceFlow .btn_create').addClass('button_blue');
		}
		function onRemoveTag(tag){
			var idx = newFlowInputPeopleTagList.indexOf(tag);
			if(idx >= 0){
				newFlowInputPeopleTagList.splice(idx, 1);
			}

			if(newFlowInputSpaceName == tag){
				newFlowInputSpaceName = '';
			}
			
			if(newFlowInputPeopleTagList.length == 0 && newFlowInputSpaceName.length == 0){
				//$('#newSpaceFlow .btn_create').removeClass('button_blue');
			}

			setTimeout(function(){
				if(newFlowInputPeopleTagList.length > 1){
					setSuggestedSpace();
				}
			}, 10);
		}


	};


	function spaceCreated(space, people){
		// add new room to top
    	var should_add_new = true;

		if(people.length == 1 && space == ''){
			for(var i=room_list.length-1; i>=0; i--){
				var itm = room_list[i];
				if(itm.name == people[0]){
					space = people[0];
					should_add_new = false;
					break;
				}
			}
		}

		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.name == space){
				should_add_new = false;
				break;
			}
		}


    	if(should_add_new){
    		var type;
    		if(people.length == 1){
    			type = 'people';
    		}else{
    			type = 'space';
    		}
    		var newSpaceName = '';
    		if(space != ''){
    			newSpaceName = space;
    		}else{
    			if(people.length > 1){
    				var firstNameArr = [];
    				for(var i=0; i<people.length; i++){
	    				var pname = people[i];
	    				firstNameArr.push(pname.split(' ')[0]);
	    			}
	    			newSpaceName = firstNameArr.join(', ');
    			}else{
    				newSpaceName = people[0];
    			}
    		}
    		
    		var newSpaceItem = createNewSpace(type, newSpaceName, people);

			if(incall_room_id){
				// second item
				room_list.splice(1, 0, newSpaceItem);
			}else{
				// first item
				room_list.unshift(newSpaceItem);
			}

			createRoomList();
			selectRoom(newSpaceItem.id);

    	}else{

    		for(var i=room_list.length-1; i>=0; i--){
				var itm = room_list[i];
				if(itm.name == space){

					selectRoom(itm.id);

					showActPanel('chat');
					
					break;
				}
			}

    	}

	}

	$('#newSpaceFlow .btn_create').on('click', function(evt){
		evt.stopPropagation();

		if(!$(this).hasClass('button_blue')){
			return;
		}

		$('#newSpaceFlow .input_people_div').remove();

		var space = '';
		var people = '';

		if(newFlowInputSpaceName.length > 0){
			space = newFlowInputSpaceName;
		}else{
			space = $('#newSpaceFlow .input_space').val();
		}

		if(newFlowInputPeopleTagList.length > 0){
			people = newFlowInputPeopleTagList;
		}else{
			var len = room_list.length;
			for(var i=0; i<len; i++){
				var room = room_list[i];
				var name = room.name;
				if(newFlowInputSpaceName == name){
					people = room.people;
					break;
				}
			}
		}

		spaceCreated(space, people);

	});
	


	// -----------------------------------
	//          meeting details
	// -----------------------------------
	$('#pop_meetingdetails').hide();
	function showMeetingDetails(point, roomname, meeting){

		var title = meeting.title;
		var time = meeting.time;
		var host = meeting.host;
		var people = meeting.people;
		var des = meeting.des ? meeting.des : 'In this meeting, Brandon and Maria are going to share some data about Spark with us. Hopefully we can start using both quantitative and qualitative data to create a better experience for Spark users. <br><br>Agenda:<br>1.  Team Space feedback - All (5 mins)<br>2.  Org change - Giacomo (10 mins)<br>3.  Design Brief - All (10 mins)<br>4.  Budgets - Melania (5 mins)';
		var link = meeting.link ? meeting.link : 'https://go.webex.com/m/35cf15b4...';
		var location = meeting.location ? meeting.location : 'SFO31 Mississippi Room';

		var timearr = time.split(',');
		var time2 = moment($.trim(timearr[1]));
		var pastmeeting = time2.format('x') < moment().format('x');

		var html = '';
		var plsthtml = '';
		var roomid;

		var len = room_list.length;
		for(var i=0; i<len; i++){
			var room = room_list[i];
			if(room.name == roomname){
				roomid = room.id;
				if(!people || people.length == 0){
					people = room.people;
				}
				break;
			}
		}

		//people
	
		var listhtml = '';

		var hostinfo = people_list[host];				
		listhtml += '<div class="listitem " >';
		listhtml += '<div class="avatar" people="'+host+'" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + hostinfo.avatar + '"></div>';
		listhtml += '<div class="label_line1">' + host + '</div>';
		listhtml += '<div class="label_line2">Organizer</div>';
		listhtml += '</div>';

		var selfinfo = people_list[self_name];				
		listhtml += '<div class="listitem " >';
		listhtml += '<div class="avatar" people="'+self_name+'" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + selfinfo.avatar + '"></div>';
		listhtml += '<div class="label_line1">' + self_name + '</div>';
		listhtml += '<div class="label_line2">Accepted</div>';
		listhtml += '</div>';

		for(var j=0; j<people.length; j++){
			var pname = people[j];
			var p = people_list[pname];
			if(pname != host && pname != self_name){
				var status;
				if(!pastmeeting){
					status = 'Joined';
				}else{
					status = j % 2 == 0 ? 'Accepted' : 'Waiting for response';
				}
				listhtml += '<div class="listitem " >';
				listhtml += '<div class="avatar" people="'+pname+'" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + p.avatar + '"></div>';
				listhtml += '<div class="label_line1">' + pname + '</div>';
				listhtml += '<div class="label_line2">' + status + '</div>';
				listhtml += '</div>';
			}
		}

		plsthtml += '<div class="commonlist" style="width:100%; top:0px; left:0px; ">'
		plsthtml += listhtml;
		plsthtml += '</div>';

		//
		
		html += '<div class="header section" >'
		html += '<div class="title" >' + title + '</div>';
		html += '<div class="spacename" >' + roomname + '</div>';
		html += '<div style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/btn_edit_meeting_detail.svg); height:32px; width:32px; position:absolute; top:15px; right:20px;"></div>';
		html += '</div>';


		html += '<div class="baseinfo section" >';
		var timearr = time.split(',');
		var time1 = moment($.trim(timearr[0]));
		var time2 = moment($.trim(timearr[1]));
		html += '<div class="time" >' + time1.format('dddd, MMMM D, YYYY') + '</div>';
		html += '<div class="time" >' + time1.format('h:mm A')+' - '+time2.format('h:mm A') + '</div>';
		html += '<div class="location" >' + location + '</div>';
		html += '</div>';


		html += '<div class="scrollpane section" >'

		// link
		html += '<div class="subheader" >' + 'Meeting link' + '<div class="arrbtn" data-expanded="0" data-contentid="pop_meeting_cont_link" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/arrow_down.svg"></div></div>';
		html += '<div id="pop_meeting_cont_link" class="info" style="display:none;" >'
		html += '<span class="" >' + link + '</span>';
		html += '<span class="link copy" >Copy</span>';
		html += '</div>';

		// des
		html += '<div class="subheader" >' + 'Meeting description' + '<div class="arrbtn" data-expanded="0" data-contentid="pop_meeting_cont_des" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/arrow_down.svg"></div></div>';
		html += '<div id="pop_meeting_cont_des" class="info" style="display:none;" >'
		html += '<div class="des" >' + des + '</div>';
		html += '</div>';

		// recording
		if(pastmeeting){
			html += '<div class="subheader" >' + 'Meeting Recording' + '<div class="arrbtn" data-expanded="0" data-contentid="pop_meeting_cont_rec" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/arrow_down.svg"></div></div>';
			html += '<div id="pop_meeting_cont_rec" class="recording" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/ico_recording.svg); display:none;">';
			html += '<div class="name" >' + 'Presenter: ' + host + '</div>';
			html += '<div class="time" >' + '30 mins'+ '</div>';
			html += '</div>';
		}

		// people
		html += '<div class="subheader" >' + 'People (' + people.length + ')' + '<div class="arrbtn" data-expanded="1" data-contentid="pop_meeting_cont_people" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/arrow_up.svg"></div></div>';
		html += '<div id="pop_meeting_cont_people" class="plist" >' + plsthtml + '</div>';

		html += '</div>'; // end scrollpane


		html += '<div class="footer section con_flex_row" >'
		/*if(!pastmeeting){
			html += '<div class="btn flex_1 button_gray btn_copy" >Copy invite</div>';
		}*/ // 040418 Fi removed copy invite btn

		html += '<div class="btn flex_1 button_blue btn_chat" >Chat</div>';
		if(!pastmeeting){
			html += '<div class="btn flex_1 button_green btn_join" >Join</div>';
		}
		html += '</div>'; // end footer
		

		$('#pop_meetingdetails .wrap').html(html);
	
		$('#pop_meetingdetails').show();
		$('#pop_meetingdetails').fadeIn();

		// position
		function setPos(){
			var poph = $('#pop_meetingdetails .wrap').height();
			var dskh = $('#desktop').height();

			$('#pop_meetingdetails').css('top', point.top);

			if(point.top > 220 && point.top+poph-170 < dskh){
				$('#pop_meetingdetails .wrap').css('top', '-170px');
			}else if(point.top+poph-170 >= dskh){
				$('#pop_meetingdetails .wrap').css('top', '-'+(poph-(dskh-point.top)+10)+'px');
			}else{
				$('#pop_meetingdetails .wrap').css('top', '-'+(point.top-10)+'px');
			}
			if(point.left){
				$('#pop_meetingdetails').css('left', point.left+15);
			}
		}
		setPos()

		//

		$('#pop_meetingdetails .arrbtn').off('click');
		$('#pop_meetingdetails .arrbtn').on('click', function(evt){
			evt.stopPropagation();
			var expanded = $(this).attr('data-expanded');
			var contentid = $(this).attr('data-contentid');
			if(expanded == 0){
				$(this).attr('data-expanded', 1);
				$(this).css('background-image', 'url(' + hypeDocument.resourcesFolderURL() + '/arrow_up.svg)');
				$('#'+contentid).show();
			}else{
				$(this).attr('data-expanded', 0);
				$(this).css('background-image', 'url(' + hypeDocument.resourcesFolderURL() + '/arrow_down.svg)');
				$('#'+contentid).hide();
			}

			var sph = $('#pop_meetingdetails .scrollpane').height();
			if(sph >= 450){
				$('#pop_meetingdetails .footer').css('border-top', '1px solid rgba(0, 0, 0, 0.08)');
			}else{
				$('#pop_meetingdetails .footer').css('border-top', '1px solid rgba(0, 0, 0, 0.0)');
			}

		});

		$('#pop_meetingdetails .spacename').off('click');
		$('#pop_meetingdetails .spacename').on('click', function(evt){
			evt.stopPropagation();
			$('#pop_meetingdetails').fadeOut(100);
			selectRoom(roomid);
			showWaffleMenu(false, false);
		});

		$('#pop_meetingdetails .btn_chat').off('click');
		$('#pop_meetingdetails .btn_chat').on('click', function(evt){
			evt.stopPropagation();
			$('#pop_meetingdetails').fadeOut(100);
			selectRoom(roomid);
			showActPanel('chat');
		});

		$('#pop_meetingdetails .btn_join').off('click');
		$('#pop_meetingdetails .btn_join').on('click', function(evt){
			evt.stopPropagation();
			$('#pop_meetingdetails').fadeOut(100);
			selectRoom(roomid);
			showActPanel('call');
		});


		$('#pop_meetingdetails .avatar').off('mouseover');
		$('#pop_meetingdetails .avatar').on('mouseover', function(evt){
			evt.stopPropagation();
			var peoplename = $(this).attr('people');
			if(!peoplename){
				return;
			}

			var elemL = $(this).offset().left;
			var elemT = $(this).offset().top;
			var deskL = $('#desktop').offset().left;
			var deskT = $('#desktop').offset().top;
			var top = elemT - deskT + $(this).height()/2;
			var left = elemL - deskL;
			var point = {
				'top': top,
				'left': left
			};

			var ref = $(this);
			var tmo_id = setTimeout(function(){
				showContactCard(peoplename, 'right', point, ref);
			}, 500)

			$(this).attr('tmo_id', tmo_id);
		});

		$('#pop_meetingdetails .avatar').off('mouseout');
		$('#pop_meetingdetails .avatar').on('mouseout', function(evt){
			evt.stopPropagation();
			var tmo_id = $(this).attr('tmo_id');
			clearTimeout(tmo_id)
		});


	}

	$('#intersPanel .meeting_info').on('click', function(evt){
		evt.stopPropagation();

		var title = $('#intersPanel .name').text();
		var meeting;
		for(var i=0; i<room_list.length; i++){
			var room = room_list[i];
			if(room.name == 'Marketing'){
				for(var j=0; j<room.meetingList.length; j++){
					if(room.meetingList[j].title == title){
						meeting = room.meetingList[j];
						break;
					}
				}
				break;
			}
		}

		var elemL = $(this).offset().left;
		var elemT = $(this).offset().top;
		var deskL = $('#desktop').offset().left;
		var deskT = $('#desktop').offset().top;
		var top = elemT - deskT + $(this).height()/2;
		var left = elemL - deskL + $(this).width();
		var point = {
			'top': top,
			'left': left
		};
		showMeetingDetails(point, 'Marketing', meeting);
	});



	// -----------------------------------
	//          meeting details
	// -----------------------------------
	$('#pop_contact_card').hide();
	var contact_card_tmo_id;
	function showContactCard(peoplename, direction, point, trigger){
		clearTimeout(contact_card_tmo_id);
		
		var pinfo = people_list[peoplename];

		$('#pop_contact_card .avatar .ava-img').css('background-image', 'url(' + hypeDocument.resourcesFolderURL() + '/' + pinfo.avatar + '');
		$('#pop_contact_card .lb_name').text(peoplename)
		$('#pop_contact_card .lb_email').text(pinfo.email)
	
		$('#pop_contact_card').stop().fadeIn(0).show();

		var poph = $('#pop_contact_card .wrap').height();
		var popw = $('#pop_contact_card .wrap').width();
		var dskh = $('#desktop').height();

		$('#pop_contact_card').css('top', point.top);

		if(point.top > 220 && point.top+poph-170 < dskh){
			$('#pop_contact_card .wrap').css('top', '-170px');
		}else if(point.top+poph-170 >= dskh){
			$('#pop_contact_card .wrap').css('top', '-'+(poph-(dskh-point.top)+10)+'px');
		}else{
			$('#pop_contact_card .wrap').css('top', '-'+(point.top-10)+'px');
		}
		if(point.left && direction == 'left'){
			$('#pop_contact_card').css('left', point.left+15);
		}else if(point.left && direction == 'right'){
			$('#pop_contact_card').css('left', point.left-popw-15);
		}

		// position
		if(direction == 'right'){
			$('#pop_contact_card .left').hide();
			$('#pop_contact_card .right').show();
			$('#pop_contact_card').css('transform-origin', '100% 0');
		}else{
			$('#pop_contact_card .left').show();
			$('#pop_contact_card .right').hide();
			$('#pop_contact_card').css('transform-origin', '0 0');
		}
		
		$('#pop_contact_card').addClass('show');

		function onMouseMoveContactCard(evt){
			clearTimeout(contact_card_tmo_id);
			contact_card_tmo_id = setTimeout(checkMouseInCard, 300);
			
		}

		function checkMouseInCard(){
			if( !$('#pop_contact_card').hitTest(mouseX, mouseY)){
				if(!trigger || !trigger.hitTest(mouseX, mouseY)){
					hideContactCard();
					$('body').off('mousemove', onMouseMoveContactCard);
				}
		    }
		}

		setTimeout(function(){
			$('body').on('mousemove', onMouseMoveContactCard);
		}, 300);

	}
	function hideContactCard(){
		clearTimeout(contact_card_tmo_id);
		$('#pop_contact_card').removeClass('show');
		$('#pop_contact_card').fadeOut(200);
		
	}
	
	
	// -----------------------------------
	//          user test flow - Day 1
	// -----------------------------------
	

	$('#coachmark').hide();
	$('.coachmark_step1').hide();
	
	if(window.user_test_flow_id == 1){

		FTEstarted = false;
		FTEcompleted = false;
		FTEdone_space = false;
		FTEdone_todaysMeeting = false;
		FTEdone_searchAndFilter = false;
		
		// set schedule as the default panel
		setSpaceAttr(user_test_room_id, 'defaultPanel', 'schedule'); 
		team_list = [team_list_all[0]];
		room_list = getSpaceList(room_list_day1);

		$('.lb_todaysMeeting').text('Meeting calendar');
		
		
		createRoomList();
	
		//selectFirstRoom();

		
		$('#intersPanel .menu').hide();


		showWaffleMenu(true, true);
		
		$('#waffleMenu .selected').hide();

		// hide main app
		$('#mainframe').show();
		$('#getApp').hide();
		
		//042418 Fi - hide sign flow until new branding comes through 

		/*$('#email').show();


		
		$('#email .btn_get').on('click', function(evt){
			evt.stopPropagation();
			
			$('#email').hide();
			$('#getApp').show();
			
		});

		$('#getApp .btn_next').on('click', function(evt){
			evt.stopPropagation();
			$('#getApp').hide();
			$('#mainframe').show();
			
			
			var slideshow_sign = [
				{
					class_name: 'p1',
					button_list: [
						{
							class_name: 'btn',
							onclick: ''
						}
					],
					
				},
				{
					class_name: 'p2',
					button_list: [
						{
							class_name: 'btn',
							onclick: ''
						}
					],
					
				},
				{
					class_name: 'p3',
					onload: 'activateAccount()',
					button_list: [
						{
							class_name: 'btn',
							onclick: ''
						}
					],
					
				},
				{
					class_name: 'p4',
					onload: '',
					button_list: [
						{
							class_name: 'btn',
							onclick: ''
						}
					],
					
				},
				{
					class_name: 'p5',
					onload: '',
					button_list: [
						{
							class_name: 'btn',
							onclick: 'hideSignFlow()'
						}
					],
					
				}
				
				
			];
			
			registerSlideshow('signFlow', slideshow_sign);
			$('#signFlow').show();

		});

		
		function activateAccount(){
			setTimeout(function(){
				$('#signFlow .p3').hide();
				$('#signFlow .p4').show();
			}, 1000);
		}
		*/
		hideSignFlow();

	}


	function hideSignFlow(){
		$('#signFlow').hide();

		showFTE();
		$('#coachmark .step').hide();
		$('.coachmark_step1').show();
		window.signin = true;
		
	};

	function showFTE(){
		$('#coachmark').show();
	}
	function hideFTE(){
		$('#coachmark').hide();
	}

	function checkFTEcompleted(){
		if(FTEdone_space && FTEdone_todaysMeeting){
			FTEcompleted = true;
		}
	}

	$('#leftPanel .itemlist').on('click', function(evt){
		if(!FTEcompleted && !FTEdone_space){
			removeRoomSelection();
			showFTE();
		}
	});

	$('.coachmark_step1 .b_next').on('click', function(evt){
		FTEstarted = true;
		cancelSearch();
		//$('.coachmark_step1').hide();
		$('#coachmark .step2').show();
	});

	$('#coachmark .step2 .b_next').on('click', function(evt){		
		$('#coachmark .step2').hide();
		$('#coachmark .step3').show();
		$('.coachmark_step1').css('pointer-events', 'none');
	});
 	
	function gotoFTE_activityBalls(){
		showFTE();
		$('#coachmark').css('pointer-events', 'auto');
		$('#coachmark .step').hide();

		setTimeout(gotoFTE_activityBalls2, 1000);

	}

	function gotoFTE_activityBalls2(){
		$('.coachmark_step1').hide();
		$('#coachmark .step3').hide();
		$('#coachmark .step4').fadeIn();
	}

	$('#coachmark .step4 .b_next').on('click', function(evt){		
		$('#coachmark .step4').hide();
		$('#coachmark .step5').show();
	});

	$('#coachmark .step5 .b_next').on('click', function(evt){		
		$('#coachmark').hide();
		FTEdone_space = true;
		checkFTEcompleted();
	});

	function gotoFTE_todaysMeeting(){
		$('#coachmark .step').hide();
		$('#coachmark .step6').show();
		$('#coachmark').fadeIn();
	}

	$('#coachmark .step6 .b_next').on('click', function(evt){
		$('#coachmark .step').hide();
		hideFTE();
		FTEdone_todaysMeeting = true;
		checkFTEcompleted();
	});

	function showSearchFilterFTE(){
		if(!FTEdone_searchAndFilter){
			FTEdone_searchAndFilter = true;
			$('#coachmark .step').hide();
			$('#coachmark .step7').show();
			$('#coachmark').fadeIn();
		}
	}

	$('#coachmark .step7 .b_next').on('click', function(evt){
		$('#searchBox .inputbox input').removeAttr('disabled');//012318
		$('#coachmark .step').hide();
		hideFTE();
	});

	// -----------------------------------
	//          user test flow - Day 2
	// -----------------------------------

	if(window.user_test_flow_id == 2){
	
		window.signin = true;
		FTEstarted = false;
		FTEcompleted = true;

		room_list = getSpaceList(room_list_day2);
		createRoomList();
	
		//selectFirstRoom();
		selectRoom(3); // select Branding room
		
		hideAllActPanels();
		$('#chatPanel').show();
		
		$('#connect_your_calendar').hide();
		$('#coachmark_waffle').hide();

		$('.lb_todaysMeeting').text('1 meeting today');
		
	}

	//OBTP toast
	$('.obtp_toast .btn_open_panel').on('click', function(evt){
		evt.stopPropagation();
		hideAllActPanels();
		//closeLeftPanel();
		
		dismissWaffleMenu();
		selectRoom(user_test_room_id);
		showActPanel('call');
		
	});

	$('.obtp_toast .btn_x').on('click', function(evt){
		evt.stopPropagation();
		$('.obtp_toast').fadeOut();
	});


	// device options
	$('#intersPanel .menu').hide();
	$('#intersPanel .tip_callme').hide();
	$('#preferences_meetings').hide();
	$('#iphone').hide();
	$('#inCallPanel .audio_options').hide();


	$('#intersPanel .btn_device').on('click', function(evt){
		evt.stopPropagation();
		
		if($('#intersPanel .menu').is(':visible')){
			$('#intersPanel .menu').fadeOut();

		}else{
			$('#intersPanel .menu').fadeIn();
			
		}

	});
	

	//device option click event listener pstn steps 100317
	function resetPstnPanel(){
		$('#preferences_meetings .pic').hide();
	};
	resetPstnPanel();


	$('#intersPanel .menu .btn_pref').on('click', function(evt){
		evt.stopPropagation();

		$('#intersPanel .menu').fadeOut();

		resetPstnPanel();
		$('#preferences_meetings').show();

		if(audio_type == 'pc'){
			$('#preferences_meetings .p1').show();
		}else if(audio_type == 'callme'){
			$('#preferences_meetings .p3').show();
		}

	});


	$('#preferences_meetings .btnx').on('click', function(evt){
		evt.stopPropagation();
		$('#preferences_meetings').hide();
	});

	$('#preferences_meetings .p1 .btn_save_pc').on('click', function(evt){
		evt.stopPropagation();
		$('#preferences_meetings').hide();
		$('#intersPanel .tip_callme').hide();

		audio_type = 'pc'
	});

	$('#preferences_meetings .p2 .btn_next').on('click', function(evt){
		evt.stopPropagation();
		$('#preferences_meetings .p2').hide();
		$('#preferences_meetings .p3').show();
	});

	$('#preferences_meetings .p3 .btn_save_callme').on('click', function(evt){
		evt.stopPropagation();
		$('#preferences_meetings').hide();
		$('#intersPanel .tip_callme').show();

		audio_type = 'callme'
	});

	$('#preferences_meetings .btn_go_p1').on('click', function(evt){
		evt.stopPropagation();
		resetPstnPanel();
		$('#preferences_meetings .p1').show();
	});
	$('#preferences_meetings .btn_go_p2').on('click', function(evt){
		evt.stopPropagation();
		resetPstnPanel();
		$('#preferences_meetings .p2').show();
	});
	$('#preferences_meetings .btn_go_p4').on('click', function(evt){
		evt.stopPropagation();
		resetPstnPanel();
		$('#preferences_meetings .p4').show();
	});

	$('#intersPanel .tip_callme .btn_edit').on('click', function(evt){
		evt.stopPropagation();

		resetPstnPanel();
		$('#preferences_meetings .p3').show();
		$('#preferences_meetings').show();
	});
	

	$('#inCallActivityPanel .btn_audio_options').on('click', function(evt){		
		evt.stopPropagation();

		hideInMeetingPanels()

		$('#inCallPanel .audio_options').show();
		$('#inCallPanel .audio_options .pic').hide();

		if(audio_type == 'pc'){
			$('#inCallPanel .audio_options .p1').show();
			$('#inCallPanel .audio_options .p1 .btn_save_pc').text('Continue using computer audio');
		}else if(audio_type == 'callme'){
			$('#inCallPanel .audio_options .p3').show();
			$('#inCallPanel .audio_options .p1 .btn_save_pc').text('Switch to computer audio');
		}
	});

	$('#inCallPanel .audio_options .btnx').on('click', function(evt){
		evt.stopPropagation();

		$('#inCallPanel .audio_options').hide();
	});
	$('#inCallPanel .audio_options .p1 .btn_save_pc').on('click', function(evt){
		evt.stopPropagation();
		$('#inCallPanel .audio_options').hide();
		$('#intersPanel .tip_callme').hide();

		showToast('You’re using your computer for audio');

		audio_type = 'pc'
	});

	$('#inCallPanel .audio_options .p2 .btn_next').on('click', function(evt){
		evt.stopPropagation();
		$('#inCallPanel .audio_options .p2').hide();
		$('#inCallPanel .audio_options .p3').show();
	});

	$('#inCallPanel .audio_options .p3 .btn_save_callme').on('click', function(evt){
		evt.stopPropagation();
		$('#inCallPanel .audio_options').hide();

		if(audio_type != 'callme'){
			
			$('.callme_popover').show();
			$('#iphone').show();
			playRingtone();
			//$('#inCallPanel .ctrl .btn_mute').css('opacity', 0.4);

			audio_type = 'callme'
		}
		
	});

	$('#inCallPanel .audio_options .btn_go_p1').on('click', function(evt){
		evt.stopPropagation();
		$('#inCallPanel .audio_options .pic').hide();
		$('#inCallPanel .audio_options .p1').show();
	});
	$('#inCallPanel .audio_options .btn_go_p2').on('click', function(evt){
		evt.stopPropagation();
		$('#inCallPanel .audio_options .pic').hide();
		
		if(audio_type == 'callme'){
			$('#inCallPanel .audio_options .p3').show();
		}else{
			$('#inCallPanel .audio_options .p2').show();
		}
	});
	$('#inCallPanel .audio_options .btn_go_p4').on('click', function(evt){
		evt.stopPropagation();
		$('#inCallPanel .audio_options .pic').hide();
		$('#inCallPanel .audio_options .p4').show();
	});

    
	// video button
	$('#intersPanel .btn_video').on('mouseover', function(evt){
		evt.stopPropagation();
		$('#selfVideoBackground .white').fadeTo('slow', 0);
		$('#self-view').removeClass('blurVideo');
	});
	$('#intersPanel .btn_video').on('mouseout', function(evt){
		evt.stopPropagation();
		$('#selfVideoBackground .white').fadeTo('slow', 1);
		$('#self-view').addClass('blurVideo');
		
	});
	
	// audio button
	$('#intersPanel .btn_audio').on('mouseover', function(evt){
		evt.stopPropagation();
		$('#selfVideoBackground').fadeOut();
	});
	$('#intersPanel .btn_audio').on('mouseout', function(evt){
		evt.stopPropagation();
		$('#selfVideoBackground').fadeIn();
	});

	$('#intersPanel .btn_video').on('click', function(evt){
		evt.stopPropagation();

		if(incall_room_id != undefined){
			// cannot join while already in a call
			return;
		}

		if(audio_type == 'callme'){
			joinMeetingWithVideo(true);
		}else{
			joinMeetingWithVideo();
		}

		$('.obtp_toast').fadeOut();
		
	});
	
	$('#intersPanel .btn_audio').on('click', function(evt){
		evt.stopPropagation();

		if(incall_room_id != undefined){
			// cannot join while already in a call
			return;
		}

		if(audio_type == 'callme'){
			joinMeetingWithAudio(true);
		}else{
			joinMeetingWithAudio();
			
		}
		
		$('.obtp_toast').fadeOut();
		
	});






	$('#iphone .btn_accept').on('click', function(evt){
		evt.stopPropagation();
		$('#iphone').hide();
		$('.callme_popover').fadeOut();
		$('#selfVideoBackgroundInCall').hide();
		$('#inCallPanel .connecting').hide();
		$('#inCallPanel .ctrl .btn_mute').css('opacity', 1);
		showToast('You’re using your phone for audio');

		playPeopleTalking();

		iphone_ring.pause();
	});

	$('#iphone .btn_decline').on('click', function(evt){
		evt.stopPropagation();
		$('#iphone').hide();
		$('.callme_popover').fadeOut();

		if($('#inCallPanel .ctrl .btn_mute').css('opacity') == 1){
			//
			audio_type = 'pc'
			//
		}else{
			$('.ctrl .btn_end').click();
		}

		iphone_ring.pause();
		
	});

	
	
	function joinMeetingWithVideo(showCallmePopup){

		hideAllActPanels();
		closeLeftPanel();

		// use phone for audio 
		if(showCallmePopup){
			$('.callme_popover').show();
			$('#iphone').show();
			playRingtone();
			$('#inCallPanel .ctrl .btn_mute').css('opacity', 0.4);

			// selfview Background 
			$('.connecting').show();
			$('.connecting .selfavatar').hide();
			$('.connecting .selfvideobg').show();

		}else if(switchCalls>0){
			
			$('.callme_popover').hide();
			$('.connecting').hide();

		}else{
			$('.callme_popover').hide();

			//connecting screen for all calls
			$('.connecting').show().delay(2100).fadeOut();
			$('.connecting .selfavatar').hide();						
			$('.connecting .connectSpin').fadeIn().delay(2000).fadeOut();
			$('.connecting .selfvideobg').css('opacity', 0.4);
			$('.connecting .selfvideobg').fadeIn().delay(2000).fadeOut();
			

			playPeopleTalking();
		}
		//
		$('.callin_popover').hide();


		
		showActPanel('incall');
		$('#inCallPanel .video_only').show();
		$('#inCallPanel .audio_only').hide();
		$('#right-panel-activity-name').hide(); 
		$('#right-panel-title').hide();
		$('#inCallPanel .video_only .people-avatar').css('top', '10px');
		
		setThemeColor('white');
		
		var roomData;
		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.id == selectedRoomListId){
				roomData = itm;
				break;
			}
		}
		
		
		if(roomData.people.length > 1){
			$('#inCallPanel .people-avatar').show();
		}else{
			$('#inCallPanel .people-avatar').hide();
		}

		
		autoHideHud();
		
		incall_room_id = selectedRoomListId;
		
		setSpaceAttr(incall_room_id, 'data-incall', 'true')
		setSpaceAttr(incall_room_id, 'call-type', 'video')
		
		$('#floatingVideo').hide();
		
		
		unmuteSelfAudio();
		unmuteSelfVideo();
		
		
		startInCallTimer();
		
		
		//$('#right-panel-activity-name .txt').text('');
		
		resetPstnPanel();

		setBubbleHeads();

		if(incall_room_id == user_test_room_id){
			//othersStartSharing();
		}
		//othersStopSharing();

		$('#inCallActivityPanel .balls .btn_switch_call .lb').text('Switch to audio');

		// set OBTP roster people count
		setOBTProster(4, true);

		switchCalls = 2;
		
	}
	// join with audio function

	function joinMeetingWithAudio(showCallmePopup){
		
		hideAllActPanels();
		closeLeftPanel();
		

		var roomData;
		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.id == selectedRoomListId){
				roomData = itm;
				break;
			}
		}

		if(roomData.type != 'phone'){
			$('.ctrl .tip_turn_cam_on').fadeIn();
		}else{
			$('.ctrl .tip_turn_cam_on').hide();
		}
		

		if($(callConnect==1)){
			setTimeout(function(){
			$('.ctrl .tip_turn_cam_on').fadeOut();
			}, 5100);
			resetCallConnect();

		}else{
			setTimeout(function(){
			$('.ctrl .tip_turn_cam_on').fadeOut();
			}, 3000);

		}
		
		
		

		// use phone for audio 
		if(showCallmePopup){
			$('.callme_popover').show();
			$('#iphone').show();
			$('#inCallPanel .ctrl .btn_mute').css('opacity', 0.4);
			playRingtone();
			//020918  Show audiobg 
			$('.connecting').show();
			$('.connecting .selfavatar').show();
			$('.connecting .selfvideobg').hide();
			resetCallConnect();

		}else if(switchCalls>0){
			$('.callme_popover').hide();
			$('.connecting').hide();
			resetCallConnect();

		}else{
			$('.callme_popover').hide();
			
			//connecting screen for all calls

			$('.connecting').show().delay(2100).fadeOut();
			$('.connecting .selfvideobg').hide();			
			$('.connecting .connectSpin').fadeIn().delay(2000).fadeOut();
			$('.connecting .selfavatar').fadeIn().delay(2000).fadeOut();
			callConnect = 1;

			playPeopleTalking();
		}
		//
		$('.callin_popover').hide();



		showActPanel('incall');
		$('#inCallPanel .video_only').hide();
		$('#inCallPanel .audio_only').show();
		$('#right-panel-activity-name').hide(); 
		$('#right-panel-title').hide();

		setThemeColor('white');
		
		
		
		
		$('#inCallPanel .people-avatar').show();

		autoHideHud();
		
		incall_room_id = selectedRoomListId;
		
		setSpaceAttr(incall_room_id, 'data-incall', 'true')
		setSpaceAttr(incall_room_id, 'call-type', 'audio_only')
		
		$('#floatingVideo').hide();
		
		
		unmuteSelfAudio();
		unmuteSelfVideo();
		
		
		startInCallTimer();

		
		resetPstnPanel();
		
		setBubbleHeads();

		if(incall_room_id == user_test_room_id){
			//othersStartSharing();
		}
		//othersStopSharing();

		setPeopleAvatarTop(false)
		
		$('#inCallActivityPanel .balls .btn_switch_call .lb').text('Switch to video');

		// set OBTP roster people count
		setOBTProster(4, true);
		
		switchCalls = 1;

	}

	$('.callin_popover .btn_done').on('click', function(evt){
		evt.stopPropagation();

		$('.callin_popover').hide();
		$('#inCallPanel .ctrl .btn_mute').css('opacity', 1);
		showToast('You’re using your phone for audio');

	});

	$('#inCallActivityPanel .btn_switch_call').on('click', function(evt){
		evt.stopPropagation();

		if(switchCalls==1){

			joinMeetingWithVideo();
			hideInMeetingPanels();

		}else if (switchCalls == 2){
			
			joinMeetingWithAudio();
			hideInMeetingPanels();

		}else{
			return;
		}


	});
	
	// -----------------------------------
	//          in call
	// -----------------------------------
	
	var incall_room_id;
	var recording_status = 0; //0 = Not recording, 1 = recording, 2 = paused
	
	var itv_auto_hide_hud;
	var mouseX, mouseY;
	function onMouseMove(evt){
		mouseX = evt.pageX;
	    mouseY = evt.pageY;
		autoHideHud();

		if( $('#leftPanel').hitTest(mouseX, mouseY) || $('#button_leftpanel').hitTest(mouseX, mouseY) || window.leftPanelStatus == 'closed' ){
			$('#button_leftpanel .btn').show();
	    }else{
	    	$('#button_leftpanel .btn').hide();
	    }


	}

	
	$('body').on('mousemove', onMouseMove);


	function setBubbleHeadsInCall(){
		// hide active speaker in others sharing mode
		var phw = $('#inCallPanel .video_only .people-avatar').width();
		var itmw = $('#inCallPanel .video_only .people-avatar .itm').width();
		var gap = 8;
		var numOfBubbleHeads;
		if(!in_share){
			numOfBubbleHeads = $('#inCallPanel .video_only .people-avatar .itm').length - 1;
			$('#inCallPanel .video_only .people-avatar .activeSpeaker').css('opacity', 0);
			$('#inCallPanel .video_only .people-avatar .activeSpeaker').attr('hidd', 1);
		}else{
			numOfBubbleHeads = $('#inCallPanel .video_only .people-avatar .itm').length;
			$('#inCallPanel .video_only .people-avatar .activeSpeaker').css('opacity', 1);
			$('#inCallPanel .video_only .people-avatar .activeSpeaker').attr('hidd', 0);
		}
		var left = (phw - (numOfBubbleHeads+1) * itmw - numOfBubbleHeads*gap)/2;
		var i = 0;
		$('#inCallPanel .video_only .people-avatar .itm').each(function(index, el) {
			if($(this).attr('hidd') != 1){
				var orix = left+(itmw+gap)*i;
				$(this).attr('orix', orix);
				$(this).css('left', orix);
				i++;
			}
		});
		$('#inCallPanel .video_only .people-avatar .roster_ico').css('left', left+(itmw+gap)*i );
	}
	
	
	function autoHideHud(){
		if(!$('#inCallPanel').is(':visible')){
			return;
		}
		clearTimeout(itv_auto_hide_hud);

		if(callConnect==1){
			itv_auto_hide_hud = setTimeout(hideHud, 5000);

		}else{
			itv_auto_hide_hud = setTimeout(hideHud, 3000);
		}
		resetCallConnect();

		showHud();
	}
	
	
	function hideHud(){
		if(!$('#inCallPanel').is(':visible')){
			return;
		}
		
		if( $('#inCallPanel .pop_more').hitTest(mouseX, mouseY) || $('#waffleMenu').is(':visible') ){
			return;
	    }
	    
	    if(!self_audio_muted){
			$('#inCallPanel .ctrl .btn_mute').fadeOut();
		}else{
			var ctrlw = $('#inCallPanel .ctrl').width();
			var ctrlmute = $('#inCallPanel .ctrl .btn_mute').width();
			if($('#inCallPanel .audio_only .ctrl .btn_mute').attr('ori-left') == undefined){
				$('#inCallPanel .audio_only .ctrl .btn_mute').attr('ori-left', $('#inCallPanel .audio_only .ctrl .btn_mute').css('left'));
			}
			if($('#inCallPanel .video_only .ctrl .btn_mute').attr('ori-left') == undefined){
				$('#inCallPanel .video_only .ctrl .btn_mute').attr('ori-left', $('#inCallPanel .video_only .ctrl .btn_mute').css('left'));
			}
			$('#inCallPanel .ctrl .btn_mute').animate(
					{
						left: Math.round((ctrlw-ctrlmute)/2)+'px'
					},
					{
						queue:false,
						duration:300
					}
				);
			}
		
			$('#inCallPanel .recording_indicator').animate(
					{
						left: '29px'
					},
					{
						queue:false,
						duration:300
					}
				);
		
		
		$('#inCallPanel .ctrl .btn_video').fadeOut();
		$('#inCallPanel .ctrl .btn_video_camoff').fadeOut();
		//$('#inCallPanel .ctrl .btn_share').fadeOut();
		$('#inCallPanel .ctrl .btn_more').fadeOut();
		$('#inCallPanel .ctrl .btn_end').fadeOut();
		$('#inCallPanel .ctrl .btn_plus').fadeOut();
		$('#inCallPanel .ctrl .pop_more').fadeOut(); 
		

				
		$('.video_only .selfvideo').fadeOut(); // 070617 Fi hide self view when ctrl hidden
		$('#right-panel-title').fadeOut();
		$('#button_leftpanel .btn').fadeOut(); //111818 Fi Hide left panel drawer tab
		$('.roster_ico').fadeOut();
		
		$('#inCallPanel .video_only .people-avatar .itm').each(function(index, el) {
			if($(this).attr('orix') == undefined){
				var lft = $(this).css('left');
				lft = Number(lft.split('px')[0]);
				$(this).attr('orix', lft);
			}
			$(this).css('left', Number($(this).attr('orix'))+35+'px');
		});
		
		dismissWaffleMenu();
	}
	
	
	
	function showHud(){
		if($('#inCallActivityPanel .people').is(':visible')){
			return;
		}
		
		var ctrlw = $('#inCallPanel .ctrl').width();
		var ctrlmute = $('#inCallPanel .ctrl .btn_mute').width();

		if($('#inCallPanel .video_only .ctrl .btn_mute').css('left') == Math.round((ctrlw-ctrlmute)/2)+'px'){
			$('#inCallPanel .video_only .ctrl .btn_mute').animate(
					{
						left: $('#inCallPanel .video_only .ctrl .btn_mute').attr('ori-left')
					},
					{
						queue:false,
						duration:300
					}
				);
		}

		if($('#inCallPanel .audio_only .ctrl .btn_mute').css('left') == Math.round((ctrlw-ctrlmute)/2)+'px'){
			$('#inCallPanel .audio_only .ctrl .btn_mute').animate(
					{
						left: $('#inCallPanel .audio_only .ctrl .btn_mute').attr('ori-left')
					},
					{
						queue:false,
						duration:300
					}
				);
		}
		
		$('#inCallPanel .recording_indicator').animate(
					{
						left: '68px'
					},
					{
						queue:false,
						duration:300
					}
				);
		
				
		$('#inCallPanel .ctrl .btn_mute').fadeIn(100);
		$('#inCallPanel .ctrl .btn_video').fadeIn(100);
		$('#inCallPanel .ctrl .btn_video_camoff').fadeIn(100);
		//$('#inCallPanel .ctrl .btn_share').fadeIn(100);
		$('#inCallPanel .ctrl .btn_plus').fadeIn(100);
		//$('#inCallPanel .ctrl .btn_more').fadeIn(100); // commented out for 1005 user testing
		$('#inCallPanel .ctrl .btn_end').fadeIn(100);
		
		$('.video_only .selfvideo').fadeIn(100);
		$('#button_leftpanel .btn').fadeIn(100);
		$('.roster_ico').fadeIn(100);

		$('#inCallPanel .video_only .people-avatar .itm').each(function(index, el) {
			$(this).css('left', $(this).attr('orix')+'px');
		});
	}
	
	
	
	// auto hide controls on floating video
	
	var itv_auto_hide_floating_video_ctrl;
	function onFloatingVideoMouseMove(evt){
		autoHideFloatingVideoCtrl();
	}

	$('#floatingVideo').on('mousemove', onFloatingVideoMouseMove);
	
	
	function autoHideFloatingVideoCtrl(){
		if(!$('#floatingVideo').is(':visible')){
			return;
		}
		clearTimeout(itv_auto_hide_floating_video_ctrl);
		itv_auto_hide_floating_video_ctrl = setTimeout(hideFloatingVideoCtrl, 3000);

		showFloatingVideoCtrl();
	}
	
	
	function hideFloatingVideoCtrl(){
		if(!$('#floatingVideo').is(':visible')){
			return;
		}
	    
	    if(!self_audio_muted){
			$('#floatingVideo .ctrl .btn_mute').fadeOut();
		}else{
			var ctrlw = $('#floatingVideo .ctrl').width();
			var ctrlmute = $('#floatingVideo .ctrl .btn_mute').width();
			$('#floatingVideo .ctrl .btn_mute').animate(
					{
						left: Math.round((ctrlw-ctrlmute)/2)+'px'
					},
					{
						queue:false,
						duration:300
					}
				);
		}
		
		
		$('#floatingVideo .ctrl .btn_video').fadeOut();
		$('#floatingVideo .ctrl .btn_video_camoff').fadeOut();
		//$('#floatingVideo .ctrl .btn_share').fadeOut();
		$('#floatingVideo .ctrl .btn_end').fadeOut();
		
		
		dismissWaffleMenu();
	}
	
	
	
	function showFloatingVideoCtrl(){

		if(selectedRoomListId == incall_room_id){
			$('#floatingVideo .ctrl').hide();
			return;
		}
		
		var ctrlw = $('#floatingVideo .ctrl').width();
		var ctrlmute = $('#floatingVideo .ctrl .btn_mute').width();
		if($('#floatingVideo .ctrl .btn_mute').css('left') == Math.round((ctrlw-ctrlmute)/2)+'px'){
			$('#floatingVideo .ctrl .btn_mute').animate(
					{
						left: '0px'
					},
					{
						queue:false,
						duration:300
					}
				);
		}
		
		$('#floatingVideo .ctrl').show();
		$('#floatingVideo .ctrl .btn_mute').fadeIn(100);
		$('#floatingVideo .ctrl .btn_video').fadeIn(100);
		$('#floatingVideo .ctrl .btn_video_camoff').fadeIn(100);
		//$('#floatingVideo .ctrl .btn_share').fadeIn(100);
		$('#floatingVideo .ctrl .btn_end').fadeIn(100);
		

	}
	
	
	// -----------------------
	// toast
	$('#toast').hide();
	var toast_fade_interval;
	function showToast(txt){
		$('#toast .txt').text(txt);
		$('#toast').fadeIn();
		clearTimeout(toast_fade_interval);
		toast_fade_interval = setTimeout(hideToast, 3000);
	}
	function hideToast(){
		$('#toast').fadeOut();
	}
	
	
	 
	// 071017 pop more item detailed logic
	
	function setRecordingStatus(){
		if (recording_status == 0){
			$('.pause_recording').hide();
			$('.start_stop_recording .txt').text('Start recording');
			$('.start_stop_recording .ico_start').show();
			$('.start_stop_recording .ico_stop').hide();
			$('.pop_more .wrap').css('height', (40*4)+'px');
			$('.recording_indicator').hide();
			
		}else if (recording_status == 1){
			$('.pause_recording').show();
			$('.start_stop_recording .txt').text('Stop recording');
			$('.start_stop_recording .ico_start').hide();
			$('.start_stop_recording .ico_stop').show();
			$('.pause_recording .txt').text('Pause recording');
			$('.pop_more .wrap').css('height', (40*5)+'px');
			$('.recording_indicator').show();
			$('.recording_indicator').css('animation-play-state', 'running');
			
		}else if (recording_status == 2){

			$('.pause_recording .txt').text('Resume recording');
			$('.recording_indicator').css('opacity', '1'); 			$('.recording_indicator').css('animation-play-state', 'paused');
			
		}
	}
	
	setRecordingStatus();
	
	$('.start_stop_recording').on('click', function(evt){
		evt.stopPropagation();
		
		if(recording_status == 0){
			recording_status = 1;
			showToast('Recording has started');
		}else{
			recording_status = 0;
			showToast('Recording is stopped');
		}
		
		setRecordingStatus();
		
		$('.pop_more').hide();
			
	});
	
	$('.pause_recording').on('click', function(evt){
		evt.stopPropagation();
		
		if(recording_status == 1){
			recording_status = 2;
			showToast('Recording is paused');
		}else{
			recording_status = 1;
			showToast('Recording has started');
		}
		
		setRecordingStatus();
		
		$('.pop_more').hide();
			
	});
		
	
	
	
	// -----------------------
	// mute/unmute self audio
	
	var self_audio_muted = false;
	$('.ctrl .btn_mute').on('click', function(evt){
		evt.stopPropagation();
		
		if(!self_audio_muted){
			muteSelfAudio();
			$('#inCallPanel .ctrl .btn_mute').attr('tooltip', 'Unmute');
		}else{
			unmuteSelfAudio();
			$('#inCallPanel .ctrl .btn_mute').attr('tooltip', 'Mute');
		}
			
	});
	
	function muteSelfAudio(){
		self_audio_muted = true;
		$('.ctrl .btn_mute .bg').css('background', '#07C1E4');
		$('.ico_self_muted').show();
	}
	function unmuteSelfAudio(){
		self_audio_muted = false;
		$('.ctrl .btn_mute .bg').css('background', '#333333');
		$('.ico_self_muted').hide();
	}
	
	
	// -----------------------
	// mute/unmute self video
	
	var self_video_muted = false;
	$('.ctrl .btn_video').on('click', function(evt){
		evt.stopPropagation();

		if(!self_video_muted){
			muteSelfVideo();
			$('#inCallPanel .ctrl .btn_video').attr('tooltip', 'Turn on camera');
		}else{
			unmuteSelfVideo();
			$('#inCallPanel .ctrl .btn_video').attr('tooltip', 'Turn off camera');
		}
			
	});
	
	function muteSelfVideo(){
		self_video_muted = true;
		$('.ctrl .btn_video .bg').css('background', '#07C1E4');
		$('.selfvideo').css('opacity', 0);
	}
	function unmuteSelfVideo(){
		self_video_muted = false;
		$('.ctrl .btn_video .bg').css('background', '#333333');
		$('.selfvideo').css('opacity', 1);
	}


	$('.ctrl .btn_video_camoff').on('click', function(evt){
		evt.stopPropagation();
		
		$('.ctrl .tip_turn_cam_on').hide();
		joinMeetingWithVideo();
	});
	
	
	// -----------------------
	// more
	
	$('#inCallPanel .pop_more').hide();
	$('#inCallPanel .ctrl .btn_more').on('click', function(evt){
		evt.stopPropagation();
		
		if(!$('#inCallPanel .pop_more').is(':visible')){
			$('#inCallPanel .pop_more').fadeIn(100);
		}else{
			$('#inCallPanel .pop_more').fadeOut(100);
		}
			
	});
	
   



	
	// -----------------------
	// end call
	
	$('.ctrl .btn_end').on('click', function(evt){
		evt.stopPropagation();
		
		othersStopSharing();
		hideAllActPanels();
		
		setSpaceAttr(incall_room_id, 'data-current-panel', 'call')
		setSpaceAttr(incall_room_id, 'data-incall', 'false')
		showActPanel('call');
		openLeftPanel();
		
		setThemeColor('grey');
		
		clearTimeout(itv_auto_hide_hud);
				
		$('#floatingVideo').hide();
		
		if(incall_room_id != user_test_room_id){
			stopInCallTimer(incall_room_id);
		}
		
		
		incall_room_id = undefined;

		$('#right-panel-activity-name').show(); 
		$('#right-panel-title').show();

		$('#iphone').hide();
		$('.audio_options').hide();
		$('#inCallPanel .audio_only').hide();
		$('#inCallPanel .video_only').hide();

		stopAllSounds();
		switchCalls = 0;
		resetCallConnect();
			
	});
	
	
	

	
	
	// -----------------------
	// share
	
	$('#inCallPanel .share_selection').hide();
	$('.btn_share').on('click', function(evt){

		return; //disable share function


		evt.stopPropagation();
		
		if($('#floatingVideo').is(':visible')){
			$('#floatingVideo .btn').click();
		}
		
		
		$('#inCallPanel .share_selection').show();
		dismissWaffleMenu();

	});
	
	var mainframe_top;
	var mainframe_w;
	var mainframe_h;
	
	$('#inCallPanel .share_selection .itm').on('click', function(evt){
		evt.stopPropagation();
		
		$('#inCallPanel .share_selection').hide();
		
		mainframe_top = $('#mainframe').offset().top;
		
		$('#mainframe').addClass('minimize');
		
		$('.stop_sharing').show();
		$('.sharing_border').show();
		
		

	});
		
	
	// -----------------------------------
	//          whiteboardPanel
	// -----------------------------------
	function setWhiteboardList(){
		var roomData;
		
		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.id == selectedRoomListId){
				
				roomData = itm;
				break;
			}
		}
		
		var list = roomData.whiteboardList;
		var len = list.length;
		
		// show tips when whiteboard empty
		if(len==0){
			$('#whiteboardPanel .empty_panel_tip').show();
		}else{
			$('#whiteboardPanel .empty_panel_tip').hide();
		};
		
		$('#whiteboardPanel .list .itm').hide();
		//$('#whiteboardPanel .list .itm0').show();
		
		
		for(var i=0; i<len; i++){
			var fi = list[i];
			$('#whiteboardPanel .list .itm' + i).attr('data-img', fi.img);
			
			$('#whiteboardPanel .list .itm' + i + ' .lb').text(fi.time);
			$('#whiteboardPanel .list .itm' + i + ' .img').css( 'background-image', 'url('+resourceUrl+'/asset/whiteboards/' + fi.img + ')' );
			
			$('#whiteboardPanel .list .itm' + i).show();
		}
		
		$('#whiteboardPanel .view').hide();
		
	}
	
	$('#whiteboardPanel .list .itm').on('click', function(evt){
		evt.stopPropagation();
		
		if($(this).attr('data-img') != undefined){
			var img = $(this).attr('data-img');
			
			$('#whiteboardPanel .view .img').css( 'background-image', 'url('+resourceUrl+'/asset/whiteboards/' + img + ')' );
			
			$('#whiteboardPanel .view').show();

			if(getSpaceAttr(selectedRoomListId, 'data-incall') == 'true'){
				$('#whiteboardPanel .view .img').css('top', '120px');
				$('#whiteboardPanel .view .img').css('height', '400px');
			}else{
				$('#whiteboardPanel .view .img').css('top', '82px');
				$('#whiteboardPanel .view .img').css('height', '432px');
			}

			closeLeftPanel(); 
		}

	});
	
	$('#whiteboardPanel .view .btn_list').on('click', function(evt){
		evt.stopPropagation();
		
		$('#whiteboardPanel .view').hide();
		openLeftPanel(); //062817 Fi Added to bring Left panel back

	});
	
	// -----------------------------------
	//          filesPanel
	// -----------------------------------
	function setFileList(){
		var roomData;
		
		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.id == selectedRoomListId){
				
				roomData = itm;
				break;
			}
		}
		
		var list = roomData.fileList;
		var len = list.length;

		// show tips when file panel empty
		if(len==0){
			$('#filesPanel .empty_panel_tip').show();
		}else{
			$('#filesPanel .empty_panel_tip').hide();
		};
		
		$('#filesPanel .list .itm').hide();
		//$('#filesPanel .list .itm0').show();
		
		
		for(var i=0; i<len; i++){
			var fi = list[i];
			$('#filesPanel .list .itm' + i).attr('data-name', fi.name);
			$('#filesPanel .list .itm' + i).attr('data-sub', fi.sub);
			$('#filesPanel .list .itm' + i).attr('data-img', fi.img);
			
			$('#filesPanel .list .itm' + i + ' .lb').text(fi.name);
			$('#filesPanel .list .itm' + i + ' .lb2').text(fi.sub);
			$('#filesPanel .list .itm' + i + ' .img').css( 'background-image', 'url('+resourceUrl+'/asset/files/' + fi.img + ')' );
			
			$('#filesPanel .list .itm' + i).show();
		}
		
		$('#filesPanel .view').hide();
		
	}
	
	
	
	$('#filesPanel .list .itm').on('click', function(evt){
		evt.stopPropagation();
		
		if($(this).attr('data-name') != undefined){
			var name = $(this).attr('data-name');
			var sub = $(this).attr('data-sub');
			var img = $(this).attr('data-img');
			
			$('#filesPanel .view .lb').text(name);
			$('#filesPanel .view .lb2').html("Shared by " + sub);
			$('#filesPanel .view .img').css( 'background-image', 'url('+resourceUrl+'/asset/files/' + img + ')' );
			
			$('#filesPanel .view').show();

			closeLeftPanel(); 

			//shrinkSpaceTitle();

			if(getSpaceAttr(selectedRoomListId, 'data-incall') == 'true'){
				$('#filesPanel .view .lb').hide();
				$('#filesPanel .view .lb2').hide();
				$('#filesPanel .view .img').css('top', '120px');
				$('#filesPanel .view .img').css('height', '400px');
			}else{
				//$('#filesPanel .view .lb').show();
				//$('#filesPanel .view .lb2').show();
				$('#filesPanel .view .lb').hide();
				$('#filesPanel .view .lb2').hide();
				$('#filesPanel .view .img').css('top', '82px');
				$('#filesPanel .view .img').css('height', '432px');
			}
		}
		

	});
	
	$('#filesPanel .view .btn_list').on('click', function(evt){
		evt.stopPropagation();
		
		$('#filesPanel .view').hide();
		openLeftPanel(); //062817 Fi Added to bring Left panel back


		if(getSpaceAttr(selectedRoomListId, 'data-incall') != 'true'){
			//restoreSpaceTitle();
		}

	});
	
	
	
	
	
	// -----------------------------------
	//          my stuff
	// -----------------------------------
	$('#pop_mystuff').hide();
	$('#pop_mystuff .sub_status').hide();
	$('#pop_mystuff .avatar .edit_msk').hide();
	$('#pop_teams').hide();


	$('#self_avatar').on('click', function(evt){
		evt.stopPropagation();
		if(!$('#pop_mystuff').is(':visible')){
			var elemL = $(this).offset().left;
			var deskL = $('#desktop').offset().left;
			var left = elemL - deskL + $(this).width()/2 - $('#pop_mystuff').width()/2;
			$('#pop_mystuff').css('left', left);
			$('#pop_mystuff').fadeIn();
		}else{
			$('#pop_mystuff').fadeOut(100);
		}
	});

	$('#pop_mystuff .btn_status').on('mouseover', function(evt){
		evt.stopPropagation();
		$('#pop_mystuff .sub_status').fadeIn();
	});

	$('#pop_mystuff .btn_status').on('mouseout', function(evt){
		evt.stopPropagation();
		setTimeout(function(){
			var xPos = evt.pageX;
		    var yPos = evt.pageY;
		    if(!$('#pop_mystuff .sub_status').hitTest(xPos, yPos)){
				$('#pop_mystuff .sub_status').fadeOut(100);
		    }
		}, 200);
	});

	$('#pop_mystuff .sub_status').on('mouseover', function(evt){
		evt.stopPropagation();
		$('#pop_mystuff .sub_status').on('mouseout', function(evt){
			evt.stopPropagation();
			var xPos = evt.pageX;
		   	var yPos = evt.pageY;
		    if(!$('#pop_mystuff .sub_status').hitTest(xPos, yPos)){
				$('#pop_mystuff .sub_status').fadeOut(100);
				$('#pop_mystuff .sub_status').off('mouseout');
		    }
		});
	});


	$('#pop_mystuff .avatar').on('mouseover', function(evt){
		evt.stopPropagation();
		$('#pop_mystuff .edit_msk').show();
	});

	$('#pop_mystuff .avatar').on('mouseout', function(evt){
		evt.stopPropagation();
		$('#pop_mystuff .edit_msk').hide();
	});


	$('#pop_mystuff .btn_teams').on('click', function(evt){
		evt.stopPropagation();
		$('#pop_mystuff').fadeOut(100);
		$('#pop_teams').fadeIn();
	});

	$('#pop_mystuff .btn_settings').on('click', function(evt){
		evt.stopPropagation();
		$('#pop_mystuff').fadeOut(100);
		$('#preferences').fadeIn();
	});

	$('#pop_teams .close').on('click', function(evt){
		evt.stopPropagation();
		$('#pop_teams').fadeOut(100);
	});

	$('#pop_mystuff .btn_invite').on('click', function(evt){
		evt.stopPropagation();
		$('#pop_mystuff').fadeOut(100);
		$('#pop_invite .p1').show();
		$('#pop_invite .p2').hide();
		$('#pop_invite .invite').show();
		$('#pop_invite .pending').hide();
		$('#pop_invite .btn_back').show();
		$('#pop_invite').fadeIn();
	});

	$('#pop_mystuff .btn_send_invite').on('click', function(evt){
		evt.stopPropagation();
		$('#pop_mystuff').fadeOut(100);
		$('#pop_invite .invite').hide();
		$('#pop_invite .pending').show();
		$('#pop_invite .btn_back').hide();
		$('#pop_invite').fadeIn();
	});


	

	// -----------------------------------
	//          meetingListPanel
	// -----------------------------------
	function setMeetingList(){
		var roomData;
		
		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.id == selectedRoomListId){
				
				roomData = itm;
				break;
			}
		}
		
		var list = roomData.meetingList;
		var len = list.length;
		
		// show tips when meetinglist panel empty
		if(len==0){
			$('#meetingListPanel .empty_panel_tip').show();
			$('#btn_schedule_meeting').hide();
			$('#meetingListPanel .btn_goto_cal').hide();
		}else{
			$('#meetingListPanel .empty_panel_tip').hide();
			$('#btn_schedule_meeting').show();
			$('#meetingListPanel .btn_goto_cal').show();
		};
		
		$('#meeting_list_wrapper').html('');

		
		$('.empty_meeting_item').hide();
		
		var item_dom = $('.empty_meeting_item');
		
		var top = 0;
		var margin = 4;
	
		for(var i=0; i<len; i++){
			var obj = list[i];

			var title = obj.title;
			var time = obj.time;
			var host = obj.host;
			var people = obj.people;
			
			
			var itm = item_dom.clone();
			itm.show();
			itm.removeClass('empty_meeting_item');

			itm.css('top', top + 'px');
			itm.attr('data-title', title);
			itm.attr('data-time', time);
			
			itm.find('.title').html(title);
			itm.find('.host').html(host);

			var timearr = time.split(',');
			var time1 = moment($.trim(timearr[0]));
			var time2 = moment($.trim(timearr[1]));
			itm.find('.time').html(time1.format('MMMM D')+'<br>'+time1.format('h A')+' - '+time2.format('h A'));

			$('#meeting_list_wrapper').append(itm);
			
			top += itm.height() + margin;
			
		}

		$('#meeting_list_wrapper .meeting_item').off('click');
		$('#meeting_list_wrapper .meeting_item').on('click', function(evt){
			evt.stopPropagation();
			var title = $(this).attr('data-title');
			var time = $(this).attr('data-time');

			var meeting;
			var curroom;
			for(var i=0; i<room_list.length; i++){
				var room = room_list[i];
				if(room.id == selectedRoomListId){
					curroom = room;
					for(var j=0; j<room.meetingList.length; j++){
						if(room.meetingList[j].title == title){
							meeting = room.meetingList[j];
							break;
						}
					}
					break;
				}
			}

			var elemT = $(this).offset().top;
			var deskT = $('#desktop').offset().top;
			var top = elemT - deskT + $(this).height()/2;
			var point = {
				'top': top
			};
			showMeetingDetails(point, curroom.name, meeting);

		});


		
		
	}

	function resetTodaysMeeting(){

		var dateHasMeeting = [];
		for(var i=0; i<room_list.length; i++){
			var room = room_list[i];
			var mlist = room.meetingList;
			for(var j=0; j<mlist.length; j++){
				var mitm = mlist[j];
				var time = mitm.time;
				var timearr = time.split(',');
				var time1 = moment($.trim(timearr[0]));
				dateHasMeeting.push(time1.format('YYYY-MM-DD'));
			}
		}

		// set month
		$('#meetingListWithCalendar .lb_month').text(moment().format('MMMM'));

		// set date and week
		var weeknum = Number(moment().format('d'));//0,...6
		for(var i=0; i<=weeknum; i++){
			var tms = (weeknum-i)*86400000;
			var mom = moment(Number(moment().format('x')) - tms);
			var date = mom.format('D');//1,...31
			$('#meetingListWithCalendar .cal .d'+i+' .lb').text(date);
			if(dateHasMeeting.indexOf(mom.format('YYYY-MM-DD')) == -1){
				$('#meetingListWithCalendar .cal .d'+i+' .dot').hide();
			}else{
				$('#meetingListWithCalendar .cal .d'+i+' .dot').show();
			}
		}
		for(var i=weeknum+1; i<7; i++){
			var tms = (i-weeknum)*86400000;
			var mom = moment(Number(moment().format('x')) + tms);
			var date = mom.format('D');//1,...31
			$('#meetingListWithCalendar .cal .d'+i+' .lb').text(date);
			if(dateHasMeeting.indexOf(mom.format('YYYY-MM-DD')) == -1){
				$('#meetingListWithCalendar .cal .d'+i+' .dot').hide();
			}else{
				$('#meetingListWithCalendar .cal .d'+i+' .dot').show();
			}
		}

		$('#meetingListWithCalendar .cal .d'+weeknum).addClass('selected');

		// meetings
		setMeetingListOnDate(today_date);


		var b_today = $('#meetingListWithCalendar .cal .d'+weeknum);
		var b_yesterday = $('#meetingListWithCalendar .cal .d'+(weeknum-1));
		
		b_today.on('click', function(evt){
			evt.stopPropagation();
			setMeetingListOnDate(today_date);
		});
		b_yesterday.on('click', function(evt){
			evt.stopPropagation();
			setMeetingListOnDate(yesterday_date);
		});
	}

	function showTodaysMeeting(){
		resetTodaysMeeting();
		$('#meetingListWithCalendar').show();
	}

	function hideTodaysMeeting(){
		$('#meetingListWithCalendar').hide();
	}
	hideTodaysMeeting();


	function showUnreadSpaces(){
		$('#unreadSpacePanel').show();
	}

	function hideUnreadSpaces(){
		$('#unreadSpacePanel').hide();
	}
	hideUnreadSpaces();


	// data: YYYY-MM-DD
	function setMeetingListOnDate(date){

		var weeknum = Number(moment(date).format('d'));
		$('#meetingListWithCalendar .cal .date').removeClass('selected');
		$('#meetingListWithCalendar .cal .d'+weeknum).addClass('selected');

		// meeting list
		var list = [];
		for(var i=0; i<room_list.length; i++){
			var room = room_list[i];
			var mlist = room.meetingList;
			for(var j=0; j<mlist.length; j++){
				var mitm = mlist[j];
				var time = mitm.time;
				var timearr = time.split(',');
				var time1 = moment($.trim(timearr[0]));
				if(time1.format('YYYY-MM-DD') == date){
					mitm.time1 = time1;
					mitm.space = room.name;
					list.push(mitm);
				}
			}
		}

		list.sort(function(a, b){
			if(a.time1 < b.time1){
				return -1;
			}else if(a.time1 > b.time1){
				return 1;
			}else{
				return 0;
			}
	    });

		var len = list.length;
		$('#meetingListWithCalendar .list').html('');
		$('.empty_cal_meeting_item').hide();
		
		var item_dom = $('.empty_cal_meeting_item');
		
		var top = 0;
		var margin = 4;

	
		for(var i=0; i<len; i++){
			var obj = list[i];

			var title = obj.title;
			var time = obj.time;
			var space = obj.space;
			var host = obj.host;
			var people = obj.people;
			
			
			var itm = item_dom.clone();
			itm.show();
			itm.removeClass('empty_cal_meeting_item');

			itm.css('top', top + 'px');
			itm.css('left', '0px');
			itm.attr('data-title', title);
			itm.attr('data-space', space);
			itm.attr('data-time', time);
			
			itm.find('.title').html(title);
			itm.find('.space').html(space);

			itm.find('.space').attr('data-space', space);
			itm.find('.space').attr('tooltip', 'Go to space');
			regTooltip(itm.find('.space'), 'up');	

			var p = people_list[host];
			if(p != undefined && p.avatar.length > 0){
				itm.find('.avatar').find('.ava-img').css( 'background-image', 'url(' + hypeDocument.resourcesFolderURL() + '/' + p.avatar + ')' );
				itm.find('.avatar').attr('people', host);
			}

			//itm.find('.avatar').attr('tooltip', host);
			//regTooltip(itm.find('.avatar'), 'up');			

			var timearr = time.split(',');
			var time1 = moment($.trim(timearr[0]));
			var time2 = moment($.trim(timearr[1]));
			itm.find('.time').html(time1.format('h:mm A'));

			$('#meetingListWithCalendar .list').append(itm);
			
			top += itm.height() + margin;
			
		}

		$('#meetingListWithCalendar .meeting_item').off('click');
		$('#meetingListWithCalendar .meeting_item').on('click', function(evt){
			evt.stopPropagation();
			var title = $(this).attr('data-title');
			var space = $(this).attr('data-space');
			var time = $(this).attr('data-time');

			var meeting;
			var curroom;
			for(var i=0; i<room_list.length; i++){
				var room = room_list[i];
				if(room.name == space){
					curroom = room;
					for(var j=0; j<room.meetingList.length; j++){
						if(room.meetingList[j].title == title){
							meeting = room.meetingList[j];
							break;
						}
					}
					break;
				}
			}

			var elemT = $(this).offset().top;
			var deskT = $('#desktop').offset().top;
			var top = elemT - deskT + $(this).height()/2;
			var point = {
				'top': top
			};
			showMeetingDetails(point, curroom.name, meeting);

		});

		$('#meetingListWithCalendar .space').off('click');
		$('#meetingListWithCalendar .space').on('click', function(evt){
			evt.stopPropagation();

			var space = $(this).attr('data-space');

			for(var i=0; i<room_list.length; i++){
				var room = room_list[i];
				if(room.name == space){
					selectRoom(room.id);
					showWaffleMenu(false, false);
					break;
				}
			}
		});

		//040318 Fi

		$('.meeting_item .avatar').off('mouseover');
		$('.meeting_item .avatar').on('mouseover', function(evt){

			var peoplename = $(this).attr('people');
			if(!peoplename){
				return;
			}

			var elemL = $(this).offset().left;
			var elemT = $(this).offset().top;
			var deskL = $('#desktop').offset().left;
			var deskT = $('#desktop').offset().top;
			var top = elemT - deskT + $(this).height()/2;
			var left = elemL - deskL;
			var point = {
				'top': top,
				'left': left
			};

			var ref = $(this);
			var tmo_id = setTimeout(function(){
				showContactCard(peoplename, 'right', point, ref);
			}, 500)

			$(this).attr('tmo_id', tmo_id);
		});

		$('.meeting_item .avatar').off('mouseout');
		$('.meeting_item .avatar').on('mouseout', function(evt){
			evt.stopPropagation();
			var tmo_id = $(this).attr('tmo_id');
			clearTimeout(tmo_id)
		});
		
	}
	
	$('.btn_today').on('click', function(evt){
		evt.stopPropagation();
		setMeetingListOnDate(today_date);
	});
	$('.btn_prev').on('click', function(evt){
		evt.stopPropagation();
		setMeetingListOnDate(yesterday_date);
	});
	$('.btn_next').on('click', function(evt){
		evt.stopPropagation();
		setMeetingListOnDate(today_date);
	});


	$('#btn_schedule_meeting').on('click', function(evt){
		evt.stopPropagation();

		createFlowSchedule('inspace');
	});

	$('#btn_schedule_meeting2').on('click', function(evt){
		evt.stopPropagation();

		createFlowSchedule('inspace');
	});



	
	
	
	// -----------------------------------
	//          taskPanel
	// -----------------------------------
	function setTaskList(){
		var roomData;
		
		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.id == selectedRoomListId){
				
				roomData = itm;
				break;
			}
		}
		
		var list = roomData.taskList;
		var len = list.length;
		
		// show tips when task panel empty
		if(len==0){
			$('#taskPanel .empty_panel_tip').show();
			$('.btn_new_task').hide();
		}else{
			$('#taskPanel .empty_panel_tip').hide();
			$('.btn_new_task').show();
		};
		
		$('#task_list_wrapper').html('');

		
		$('.empty_task_item').hide();
		
		var item_dom = $('.empty_task_item');
		
		var top = 0;
	
		for(var i=0; i<len; i++){
			var obj = list[i];

			var title = obj.title;
			var time = obj.time;
			var type = obj.type;
			var people = obj.people;
			var checked = obj.checked;
			
			
			var itm = item_dom.clone();
			itm.show();
			itm.removeClass('empty_task_item');

			itm.css('top', top + 'px');
			
			itm.find('.title').html(title);
			itm.find('.time').html(time);
			itm.find('.type').html(type);
			
			var p = people_list[people];
			if(p != undefined && p.avatar.length > 0){
				itm.find('.ava').find('.ava-img').css( 'background-image', 'url(' + hypeDocument.resourcesFolderURL() + '/' + p.avatar + ')' );
			}
			
			if(checked){
				itm.find('.title').css('top', '9px');
				itm.find('.time').hide();
				itm.find('.checkbox1').hide();
			}else{
				itm.find('.checkbox2').hide();
			}

			$('#task_list_wrapper').append(itm);
			
			top += itm.height();
			

		}
		
	}
	
	
	
	// -----------------------------------
	//          in call timer
	// -----------------------------------

	function setInCallTimer(roomid){
	
		function formatNum(n){
			if(n < 10){
				return ('0'+n);
			}else{
				return n;
			}
		}

		var seconds_last = Number(getSpaceAttr(roomid, 'seconds_last'));
		
		seconds_last++;
		var m = Math.floor(seconds_last/60);
		var s = seconds_last%60

		setSpaceAttr(roomid, 'seconds_last', seconds_last);
		
		$('#room-'+roomid+' .in_call_time .txt').text(formatNum(m) + ':' + formatNum(s));

	}
	
	function startInCallTimer(roomid){
		
		if(getSpaceAttr(roomid, 'timer_interval_id') == undefined || getSpaceAttr(roomid, 'timer_interval_id') == 0){
			setSpaceAttr(roomid, 'seconds_last', 0);// start from time
			var timer_interval_id = setInterval(setInCallTimer, 1000, roomid);
			setSpaceAttr(roomid, 'timer_interval_id', timer_interval_id);
			setInCallTimer(roomid);
			
		}
		
		if(roomid == undefined){
			roomid = selectedRoomListId;
		}
		$('#room-'+roomid+' .in_call_time').fadeIn();
		$('#room-'+roomid+' .ico_ppl').fadeIn();
		$('#room-'+roomid+' .ico_mention').css('opacity', 0);

		setSpaceAttr(roomid, 'meeting_started', 1);

		
	}
	function stopInCallTimer(roomid){
		var timer_interval_id = getSpaceAttr(roomid, 'timer_interval_id')
		clearInterval(timer_interval_id);
		setSpaceAttr(roomid, 'timer_interval_id', 0);

		$('#room-'+roomid+' .in_call_time').fadeOut();
		$('#room-'+roomid+' .ico_ppl').fadeOut();
		$('#room-'+roomid+' .ico_mention').css('opacity', 0);

		setSpaceAttr(roomid, 'meeting_started', 0);
	}
	
	
	
	// -----------------------------------
	//          selfview video
	// -----------------------------------
	function initSelfVideo(){
	
		var selfViewVideo = document.getElementById('self-view');
		var selfViewVideo2 = document.getElementById('self-view-incall');
		var selfViewVideo3 = document.getElementById('self-view-connecting');
		
		// play if video stops playing
		var success = function(stream) {
	      window.selfStream = stream;
	      
	      selfViewVideo.src = window.URL.createObjectURL(stream);
	      selfViewVideo.addEventListener('pause', window.playVideoElement);
	      
	      selfViewVideo2.src = window.URL.createObjectURL(stream);
	      selfViewVideo2.addEventListener('pause', window.playVideoElement);

	      selfViewVideo3.src = window.URL.createObjectURL(stream);
	      selfViewVideo3.addEventListener('pause', window.playVideoElement);
	    };
	    var videoError = function(error) {
	      console.log(error);
	    };
	    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
	    if (navigator.getUserMedia) {
	      navigator.getUserMedia({ video: true }, success, videoError);
	    }
	    
	    //selfViewVideo.play();
	    
	}
	
	initSelfVideo();
	

	
	// --------------------------------------------
	//   Common functions for slideshow type flow
	// --------------------------------------------
	
	function registerSlideshow(parentid, slideshowlist){
		var len = slideshowlist.length;
		for(var i=0; i<len; i++){
			var page = slideshowlist[i];
			var silde_class_name = page.class_name;
			
			var slideelem = $('#' + parentid + ' .' + silde_class_name);
			if(i != 0){
				slideelem.hide();
			}else{
				slideelem.show();
			}
				
			var btns = page.button_list;
			var len2 = btns.length;
			
			for(var j=0; j<len2; j++){
				var btn = btns[j];
				var btn_class = btn.class_name;
				var onclick = btn.onclick;
				
				var btnelem = $('#' + parentid + ' .' + silde_class_name + ' .' + btn_class);
				
				btnelem.css('opacity', 0);
				btnelem.css('cursor', 'pointer');
				
				btnelem.attr('parent_class', silde_class_name);
				btnelem.attr('func-onclick', onclick);
				btnelem.attr('func-onload', onload);
				
				btnelem.on('click', function(evt){
					evt.stopPropagation();
					if($(this).attr('func-onclick') != ''){
						eval($(this).attr('func-onclick'));
					}else{
						// show next slide
						for(var k=0; k<slideshowlist.length; k++){
							if(slideshowlist[k].class_name == $(this).attr('parent_class')){
								var next_slide_id = k+1;
								$('#' + parentid + ' .' + $(this).attr('parent_class')).hide();
								$('#' + parentid + ' .' + slideshowlist[next_slide_id].class_name).show();
								
								// on load func
								var onload = slideshowlist[next_slide_id].onload;
								if(onload){
									var onloadlist = onload.split(',');
									for(var kk=onloadlist.length-1; kk>=0; kk--){
										eval(onloadlist[kk]);
									}
									
								}
								break;
							}
						}
					}
					
				});
			}
			
		}
	} 
	
	


	
	function gotoSpaceAndCall(roomtitle, type){
		var roomid;
		for(var i=room_list.length-1; i>=0; i--){
			var itm = room_list[i];
			if(itm.name == roomtitle){
				roomid = itm.id;
				break;
			}
		}
		
		if(roomid == undefined){
			// add new room to top
			for(var i=room_list_all.length-1; i>=0; i--){
				var itm = room_list_all[i];
				if(itm.name == roomtitle){
					roomid = itm.id;
					room_list.unshift(itm);
					createRoomList();
					break;
				}
			}
		}
		
		dismissWaffleMenu();
		setSpaceAttr(roomid, 'data-current-panel', 'incall')
		selectRoom(roomid);

		if(type == 'audio_only'){
			joinMeetingWithAudio();
		}else{
			joinMeetingWithVideo();
		}
		
		//closeLeftPanel();
	}
	
	

	
	// -----------------------------------
	//       Search & Filters
	// -----------------------------------
	
	$('#leftPanel .taglist').hide();
	$('#searchBox .ico_x').hide();
	
	$('#searchBox .search-input-box').tagsInput({
		'height':'32px',
		'width':'2500px',
		'interactive':true,
		'textColor':'#FFFFFF',
		'defaultText':'',
		//'onAddTag':callback_function,
		'onRemoveTag':onSearchInputTagRemoved,
		//'onChange' : onSearchInputChange,
		'removeWithBackspace' : true,
	});
	
	
	// get search input element id
	var searchInputId = $('#searchBox .search-input-box').inputId() + '_tag';
	$('#'+searchInputId).on('input', function(evt){
		// on input text changed
		var inputWidth = $('#searchBox .inputholder').width();
		var width = 0;
		var tags = $('#searchBox .tagsinput .tag');
		var len = tags.length;
		var margin = 3;
		for(var i=0; i<len; i++){
			var tag = tags[i];
			var w = $(tag).width();
			width += w + margin;
		}
		var tagInputW = 30;
		
		
		if(inputWidth > width + tagInputW){
			$('#'+searchInputId).css('width', (inputWidth-width)+'px');
			$('#searchBox .tagsinput').css('left', '0px');
			
		}else{
			$('#'+searchInputId).css('width', tagInputW+'px');
			$('#searchBox .tagsinput').css('left', -(width+tagInputW-inputWidth)+'px');
		}
		
		currentSearchValue = $('#'+searchInputId).val();

		if(searchInputTagList.length > 0){

			createRoomList(searchInputTagList, currentSearchValue);

			$('#searchBox .ico_x').show();

		}else{

			var searchstr = $.trim($('#'+searchInputId).val());

			if(searchstr == ''){

				createFilterList();
				$('#searchBox .ico_x').hide();

			}else{

				$('#searchBox .ico_x').show();

				$('#leftPanel .tabs').show();
				$('#leftPanel .taglist').hide();
				$('#leftPanel .phonelist').hide();

				var phoneNumH = 0;

				if(phoneCallHistory[0].indexOf(searchstr) > -1){

					var len = 1;
					var item_dom = $('.empty-phone-item');
					item_dom.hide();				
					roomItemHeight = item_dom.height();
					$('#phone-list-wrapper').html('');
					
					var top = 0;

					for(var i=0; i<len; i++){
						var phoneNum = phoneCallHistory[i];
					
						var itm = item_dom.clone();
						itm.show();
						itm.removeClass('empty-phone-item');
						itm.css('top', top + 'px');
						itm.attr('data-phone', phoneNum);
						itm.find('.ico_call').attr('data-phone', phoneNum);

						itm.find('.ls-room-name').html(phoneNum);

						$('#phone-list-wrapper').append(itm);
						top += roomItemHeight;
					}

					phoneNumH = len * roomItemHeight+10;

					$('#leftPanel .phonelist').show();

					function callNum(evt){
						var num = $(this).attr('data-phone');
						var spaceItem = createNewSpace('phone', num, []);
						gotoSpaceAndCall(num, 'audio_only');
						cancelSearch();
					}
					$('#phone-list-wrapper .ls .ico_call').off('click', callNum);
					$('#phone-list-wrapper .ls .ico_call').on('click', callNum);
				}

				var lh = $('#leftPanel').height();
				var headh = $('#leftPanel .head').height();
				var tagh = $('#leftPanel .taglist').height();
				var tabh = $('#leftPanel .tabs').height()+10;

				$('#leftPanel .tabs').css('top', headh+phoneNumH);
				$('#room-list-wrapper').css('top', 0);
				$('#leftPanel .itemlist').css('top', headh+tabh+phoneNumH);
				$('#leftPanel .itemlist').css('height', lh-headh-tabh-phoneNumH);

				createRoomList(searchInputTagList, currentSearchValue);
			}
		}
		
		

	});

	
	$('#searchBox .inputbox').on('click', function(evt){
		evt.stopPropagation();

		if(!inSearchView){
			if(!FTEdone_searchAndFilter){
				showSearchFilterFTE();
			}
			resetSearchInput();
		}
			
	});

	function resetSearchInput(){
		
		if(!inSearchView){
			$('#pop_device_pairing').fadeOut();
			$('#pop_device_paired').fadeOut();
			$('#btn_device_pairing').hide();
			if(!device_paired){
				hideDevicePairing(true);
			}else{
				hideDevicePaired(true);
			}
		}

		inSearchView = true;

		setSearchTab('tab_space');

		$('#searchBox').addClass('exp');
		
		
		$('#self_avatar').fadeOut(100);
		$('#btn_left_panel_add').fadeOut(100);
		$('#searchBox .ico_x').fadeOut(100);

		searchInputTagList = [];
		searchInputTagSuffix = '';
		$('#searchBox .search-input-box').importTags('');
		$('#'+searchInputId).val('');
		currentSearchValue = '';
		
		$('#btn_cancel_search').fadeIn();

		$('#leftPanel .tabs .tab_space').show();
		selectedSearchTab = 'tab_space';
		
		$('#searchBox input').attr('placeholder', 'Search');
		$('#searchBox .ico_search').css('left', '9px');
		
		$('#'+searchInputId).css('width', '200px');
		
		$('#leftPanel .taglist').fadeIn();

		$("#leftPanel .indicator_new").hide();
		$("#leftPanel .indicator_call").hide();

		selectedFilterType = undefined;
		selectedFilterName = undefined;

		createFilterList();
		showSearchTaglist();
		
		$("#leftPanel .itemlist").getNiceScroll(0).resize();
		$("#leftPanel .itemlist").getNiceScroll(0).doScrollTop(0, 0);
		
	}
	
	
	$('#btn_cancel_search').on('click', function(evt){
		evt.stopPropagation();
		
		cancelSearch()
			
	});

	$('#searchBox .ico_x').on('click', function(evt){
		evt.stopPropagation();

		if($('#searchBox .lb_filter').is(':visible')){
			cancelSearch();
		}else{
			resetSearchInput();
		}
		

	});
	
	$('#leftPanel .tabs').hide();
	$('#leftPanel .taglist').hide();
	$('#searchBox .lb_filter').hide();
	function cancelSearch(){
		inSearchView = false;

		$('#searchBox').removeClass('exp');
		
		$('#self_avatar').fadeIn();
		$('#btn_left_panel_add').show();
		$('#btn_left_panel_add').css('pointer-events', 'none');
		setTimeout(function(){
			$('#btn_left_panel_add').css('pointer-events', 'auto');
		}, 1000);
		$('#searchBox .ico_x').fadeOut(100);
		$('#btn_cancel_search').fadeOut(100);
		$('#leftPanel .tabs .tab_space').show();
		
		$('#searchBox .inputbox').css('background-color', 'rgba(255, 255, 255, 0.240)');
		$('#searchBox input').val('');
		$('#searchBox .lb_filter').hide();
		$('#searchBox .ico_search').css('left', '86px');
		$('#searchBox .ico_search').show();
		$('#searchBox input').attr('placeholder', '');
		
		searchInputTagList = [];
		searchInputTagSuffix = '';
		$('#searchBox .search-input-box').importTags('');
		$('#'+searchInputId).val('');
		currentSearchValue = '';
		
		$('#leftPanel .tabs').hide();
		$('#leftPanel .taglist').hide();
		$('#leftPanel .phonelist').hide();

		selectedFilterType = undefined;
		selectedFilterName = undefined;
	
		createRoomList();

		// select previous space
		if(selectedRoomListId >= 0){
			selectRoom(selectedRoomListId);
		}else if(selectedRoomListId == -100){
			selectTodaysMeeting();
		}

		$('#btn_device_pairing').show();
	}


	$('#leftPanel .tab_space').on('click', function(evt){
		evt.stopPropagation();
		setSearchTab('tab_space');
		createRoomList(searchInputTagList, currentSearchValue);
	});
	$('#leftPanel .tab_msg').on('click', function(evt){
		evt.stopPropagation();
		setSearchTab('tab_msg');
		createRoomList(searchInputTagList, currentSearchValue);
	});
	$('#leftPanel .tab_content').on('click', function(evt){
		evt.stopPropagation();
		setSearchTab('tab_content');
		createRoomList(searchInputTagList, currentSearchValue);
	});

	function setSearchTab(tab){
		selectedSearchTab = tab;
		$('#leftPanel .tabs .tab').removeClass('selected');
		$('#leftPanel .tabs .'+tab).addClass('selected');
	}

	
	function showSearchTaglist(){
		
		var len = search_tag_list.length;
		var html = '<div class="title">Refine your search</div>';
		for(var i=0; i<len; i++){
			var itm = search_tag_list[i];
			var tag = itm.tag;
			var des = itm.des;

			html += '<div class="tagrow" >'
			html += '<div class="tag" attr-tag="'+tag+'">'+tag+'</div>'
			html += '<div class="des">'+des+'</div>'
			html += '</div>'


		}
		
		$('#leftPanel .taglist').html(html);
		//$('#leftPanel .taglist').css('height', 'auto');
		
		$('#leftPanel .taglist .tag').off('click');
		$('#leftPanel .taglist .tag').on('click', function(evt){
			var tag = $(this).attr('attr-tag');
			if(tag != 'in:'){
				return;
			}
			
			searchInputTagList = [tag];
			$('#searchBox .search-input-box').addTag(tag);
			$('#searchBox .ico_x').show();

			$('#leftPanel .taglist').hide();

			var lh = $('#leftPanel').height();
			var headh = $('#leftPanel .head').height();

			$('#room-list-wrapper').css('top', 0);
			$('#leftPanel .itemlist').css('top', headh);
			$('#leftPanel .itemlist').css('height', lh-headh);
			
			createRoomList(searchInputTagList, currentSearchValue);
			
		});
	}
	
	
	function onSearchInputTagRemoved(tag){
		var id = searchInputTagList.indexOf(tag);
		searchInputTagList.splice(id, 1);
		showSearchTaglist();
		
		if(searchInputTagList.length == 0){
			resetSearchInput();
		}

		createFilterList();
	}



	// -----------------------------------
	//       Filters and Teams 
	// -----------------------------------

	

	function createFilterList(){

		$('.todays_meeting').hide();
		$('.unread_spaces').hide();

		if($('#filterMenu').length){
			$('#filterMenu').remove();
		}

		$('#leftPanel .taglist').show();
		$('#leftPanel .tabs').hide();
		var lh = $('#leftPanel').height();
		var headh = $('#leftPanel .head').height();
		var tagh = $('#leftPanel .taglist').height();

		$('#room-list-wrapper').css('top', 0);
		$('#leftPanel .itemlist').css('top', headh);
		$('#leftPanel .itemlist').css('height', lh-headh-tagh);


		var unread = 0;
		var mention = 0;
		var flag = 0;
		var draft = 0;
		var people = 0;

		for(var i=0; i<room_list.length; i++){
			var room = room_list[i];

			if(room.type == 'people' && room.unread){
				people++;
			}
			if(room.unread){
				unread++;
			}
			if(room.mention > 0){
				mention++;
			}
			for(var k in room.chatMsg){
				if(room.chatMsg[k].flag){
					flag++;
				}
			}
			if(room.draft){
				draft++;
			}
		}


		var html = '';
		html += '<div id="filterMenu">';

		html += '<div class="title">Suggested searches</div>';

		for(var i=0; i<filter_list.length; i++){
			var name = filter_list[i];

			var num = '';
			if(name == 'All' && unread > 0){
				num = ' ('+unread+')';
			}else if(name == 'People' && people > 0){
				num = ' ('+people+')';
			}else if(name == 'Unread' && unread > 0){
				num = ' ('+unread+')';
			}else if(name == 'Notified' && unread > 0){
				num = ' ('+unread+')';
			}else if(name == 'Mentions' && mention > 0){
				num = ' ('+mention+')';
			}else if(name == 'Flags' && flag > 0){
				num = flag;
			}else if(name == 'Drafts' && draft > 0){
				num = draft;
			}

			var ico;
			if(name == 'People'){
				ico = 'ico_people.svg';
			}else if(name == 'Unread'){
				ico = 'ico_unread.svg';
			}else if(name == 'Mentions'){
				ico = 'ico_mention.svg';
			}else if(name == 'Flags'){
				ico = 'ico_flag.svg';
			}


			html += '<div class="menuitm con_flex_row" data-type="filter" data-name="'+name+'">';

			html += '<div class="l flex_none">';
			html += '<div class="ico" style="border-radius:0; background-image:url('+hypeDocument.resourcesFolderURL()+'/'+ico+')"></div>';
			html += '</div>';
			html += '<div class="r flex_1">';
			html += name;
			html += '</div>';
			
			html += '</div>';//menuitm
		}
		
		html += '<div class="gap"></div>';
		html += '<div class="title">Teams</div>';

		var len = team_list.length;
		for(var i=0; i<len; i++){
			var team = team_list[i];

			html += '<div class="menuitm con_flex_row" data-type="team" data-name="'+team.name+'">';
			html += '<div class="l flex_none">';
			html += '<div class="ico" style="background-color:'+team.color+'"></div>';
			html += '</div>';
			html += '<div class="r flex_1">';
			html += team.name;
			html += '</div>';
			html += '</div>';//menuitm
		}

		html += '</div>';//filterMenu

		$('#room-list-wrapper').html(html);

		var htmlH = $('#filterMenu').height();
		$('#room-list-wrapper').css('height', htmlH + 'px');


		$('#filterMenu .menuitm').off('click');
		$('#filterMenu .menuitm').on('click', function(evt){
			evt.stopPropagation();
			var type = $(this).attr('data-type');
			var name = $(this).attr('data-name');
			if(type && name){
				selectFilter(type, name);
			}
		});

	}


	function selectFilter(type, name){

		if(type == 'team'){ 
			var found = false;
			for(var i=room_list.length-1; i>=0; i--){
				var itm = room_list[i];
				if(itm.team == name){
					found = true;
					break;
				}
			}
			if(!found){
				return;
			}
		}

		var tag = name;
		searchInputTagList.push(name);

		if(type == 'team'){
			//tag = 'Teams: '+name;
		}

		//$('#searchBox .search-input-box').addTag(tag);

		// set search box
		$('#searchBox').removeClass('exp');
		
		$('#self_avatar').fadeIn();
		$('#btn_left_panel_add').show();
		$('#btn_left_panel_add').css('pointer-events', 'none');
		setTimeout(function(){
			$('#btn_left_panel_add').css('pointer-events', 'auto');
		}, 1000);
		$('#btn_cancel_search').fadeOut(100);
		
		$('#searchBox .inputbox').css('background-color', 'rgba(0, 0, 0, 0.3)');
		$('#searchBox input').val('');
		$('#searchBox .lb_filter').text(tag);
		$('#searchBox .lb_filter').show();
		$('#searchBox .ico_search').hide();
		$('#searchBox input').attr('placeholder', '');

		currentSearchValue = '';

		// -- end

		$('#searchBox .ico_x').show();

		$('#leftPanel .taglist').hide();

		selectedFilterType = type;
		selectedFilterName = name;
		createRoomList(searchInputTagList, currentSearchValue);
	}


	// -----------------------------------
	//      menubar
	// -----------------------------------
	$('#menubar .baritm1').on('click', function(evt){
		evt.stopPropagation();
		$(this).addClass('selected');
		$('#menubar .menu1').show();
	});
	$('#menubar .menu1 .btn_pref').on('click', function(evt){
		evt.stopPropagation();
		$('#menubar .menu1').fadeOut(100);
		$('#menubar .baritm1').removeClass('selected');
		$('#preferences').show();
	});
	$('.btn_setting').on('click', function(evt){
		evt.stopPropagation();
		$('#menubar .menu1').fadeOut(100);
		$('#menubar .baritm1').removeClass('selected');
		$('#preferences').show(); //010418 Fi open pref from mystuff
	});
	$('#preferences').hide();
	$('#preferences .bx').on('click', function(evt){
		evt.stopPropagation();
		$('#preferences').hide();
	});




	// -----------------------------------
	//      invite flow
	// -----------------------------------
	$('#pop_invite').hide();
	$('#pop_send_invite').hide();

	$('#pop_invite .p1').on('click', function(evt){
		evt.stopPropagation();
		$('#pop_invite .p1').hide();
		$('#pop_invite .p2').show();
		$('#pop_invite .btn_send').addClass('button_blue');
	});

	$('#pop_invite .btn_send').on('click', function(evt){
		evt.stopPropagation();
		$('#pop_invite').hide();
		showToast('You invited 6 people to Cisco Spark');
	});

	$('#pop_invite .btn_pending').on('click', function(evt){
		evt.stopPropagation();
		$('#pop_invite .invite').hide();
		$('#pop_invite .pending').show();
	});

	$('#pop_invite .btn_back').on('click', function(evt){
		evt.stopPropagation();
		$('#pop_invite .invite').show();
		$('#pop_invite .pending').hide();
	});

	$('#pop_invite .close').on('click', function(evt){
		evt.stopPropagation();
		$('#pop_invite').hide();
	});


	// -----------------------------------
	//      in meeting nav
	// -----------------------------------
	var inCallActivityPanelIsVisible = false;
	$('#inCallActivityPanel').css('top', '600px');
	$('.sharing_content').css('background-image', 'url('+resourceUrl+'/asset/files/file_sharing.png?2)');
	$('.sharing_content').hide();

   	// plus  111918 Fi
   	$('#inCallPanel .ctrl .btn_plus').on('click', function(evt){
		evt.stopPropagation();
		showInMeetingPanels('balls')
	});

	$('#inCallActivityPanel .close').on('click', function(evt){
		evt.stopPropagation();
		hideInMeetingPanels()
	});

	
	

	// share desktop
	$('#inCallActivityPanel .share .border').hide();
	$('#inCallActivityPanel .share .btn').css('opacity', 0);
	$('#inCallActivityPanel .share .btn').on('mouseover', function(evt){
		evt.stopPropagation();
		$(this).css('opacity', 1);
	});
	$('#inCallActivityPanel .share .btn').on('mouseout', function(evt){
		evt.stopPropagation();
		$(this).css('opacity', 0);
	});
	$('#inCallActivityPanel .share .btn').on('click', function(evt){
		evt.stopPropagation();
		$('#desktop .stop_sharing').show();
		$('#desktop .sharing_border').show();
		$('#inCallActivityPanel .share .border').show();

		$('#floatingVideo').fadeOut(200);
		$('#mainframe').fadeOut(200);

		othersStopSharing();

		in_share = true;
		setBubbleHeadsInCall();
	});
	$('#desktop .stop_sharing .btn_stop').on('click', function(evt){
		evt.stopPropagation();
		$('#desktop .stop_sharing').hide();
		$('#desktop .sharing_border').hide();
		$('#inCallActivityPanel .share .border').hide();
		$('#mainframe').fadeIn(200);
		hideInMeetingPanels();

		in_share = false;
		setBubbleHeadsInCall();

		$('#mainframe').removeClass('minimize');


		$('#dp_share_screen .itm_app').css('opacity', 0);
		$('#appholder_low').append($('#app_reminder'));
		$('#app_reminder .dis').show();
		$('#app_reminder .act').hide();

	});
	

	// share whiteboard
	$('.sharing_whiteboard').hide();
	$('#inCallActivityPanel .whiteboard .btn').on('click', function(evt){
		evt.stopPropagation();
		var file = $(this).attr('title');
		$('.sharing_whiteboard .img').css('background-image', 'url('+resourceUrl+'/asset/whiteboards/'+file+')');
		$('.sharing_whiteboard').show();
		
		hideInMeetingPanels()
		othersStopSharing();

		in_share = true;
		setBubbleHeadsInCall();


	});
	$('.sharing_whiteboard .btn_stop').on('click', function(evt){
		evt.stopPropagation();
		$('.sharing_whiteboard').hide();

		$('#inCallPanel .video_only .video').show();

		in_share = false;
		setBubbleHeadsInCall();

		setPeopleAvatarTop(true)
	});


	// share file
	$('.sharing_file').hide();
	$('#inCallActivityPanel .files .btn').on('click', function(evt){
		evt.stopPropagation();
		var file = $(this).attr('title');
		$('.sharing_file .img').css('background-image', 'url('+resourceUrl+'/asset/files/'+file+')');
		$('.sharing_file').show();

		
		hideInMeetingPanels()
		othersStopSharing();

		in_share = true;
		setBubbleHeadsInCall();


	});
	$('.sharing_file .btn_stop').on('click', function(evt){
		evt.stopPropagation();
		$('.sharing_file').hide();

		$('#inCallPanel .video_only .video').show();

		in_share = false;
		setBubbleHeadsInCall();

		setPeopleAvatarTop(true)
	});




	// view others sharing

	function othersStartSharing(){
		$('#inCallPanel .video_only .video').hide();
		$('.sharing_content').show();
		others_is_sharing = true;
		in_share = true;
		setBubbleHeadsInCall();

		setPeopleAvatarTop(true)
		
	}
	function othersStopSharing(){
		$('#inCallPanel .video_only .video').show();
		$('.sharing_content').hide();
		others_is_sharing = false;
		in_share = false;
		setBubbleHeadsInCall();

		setPeopleAvatarTop(true)
	}
	

    function showInMeetingPanels(panel){
    	inCallActivityPanelIsVisible = true;

    	hideRosterPanel('inmeetingpanel');
    	closeLeftPanel();

    	$('#inCallActivityPanel').show();
    	$('#inCallActivityPanel .act').hide();
    	$('#inCallActivityPanel .actPanels').show();
    	$('#inCallActivityPanel .'+panel).show();
    	var txtTitle = $('#right-panel-title').text();
    	$('#inCallActivityPanel #spaceTitle').text(txtTitle);

    	$('#inCallActivityPanel').animate({
    		top: 88
    	}, {
    		duration: 300,
    		queue: false
    	});

    	setInCallFloatingVideo()

    	if(panel == 'people'){
    		hideHud();
    	}

    	setPeopleAvatarTop(true)

    	// blur background video
		$('#inCallPanel .video_only .video').addClass('blurInMeetingVideo');

    }

    function hideInMeetingPanels(){
    	inCallActivityPanelIsVisible = false;

    	$('#inCallActivityPanel').animate({
    		top: 600
    	}, {
    		duration: 300,
    		queue: false
    	});

    	$('#floatingVideo').fadeOut(200);
    	$('#inCallActivityPanel .act').fadeOut(200);
    	
    	setPeopleAvatarTop(true)

    	// remove blur background video
		$('#inCallPanel .video_only .video').removeClass('blurInMeetingVideo');
    }

    var rosterPanelIsVisible = false;
    var rosterClosedFrom;
    function showRosterPanel(openFrom){
    	rosterPanelIsVisible = true;
    	$('#roster_panel').show();


    	hideInMeetingPanels();
    	if(openFrom != 'leftpanel'){
    		closeLeftPanel();
    	}

    	var w = $('#mainframe').width()-$('#roster_panel').width()
		$('#rightPanel').css('width', w);
		$('#rightPanel').addClass('openright');
		$('#roster_panel').addClass('show');


		//set people

		var people;
		var roomid;

		var len = room_list.length;
		for(var i=0; i<len; i++){
			var room = room_list[i];
			if(room.id == selectedRoomListId){
				roomid = room.id;
				people = room.people;
				break;
			}
		}

		var listhtml = '';

		listhtml += '<div class="sub_header" >In Meeting</div>';

		var selfinfo = people_list[self_name];				
		listhtml += '<div class="listitem menuitm" >';
		listhtml += '<div class="avatar" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + selfinfo.avatar + ')"></div>';
		listhtml += '<div class="label_line1">' + self_name + '</div>';
		listhtml += '<div class="label_line2">You</div>';
		listhtml += '<div class="flex_1"></div>';
		listhtml += '<div class="flex_none ico ico_mute fixed ico_self_muted" style="display:none; background-image:url(' + hypeDocument.resourcesFolderURL() + '/ico_plist_mute.svg)"></div>';
		listhtml += '<div class="marginr flex_none"></div>';
		listhtml += '</div>';
		
		var len = people.length;
		for(var j=0; j<len; j++){
			var pname = people[j];
			var p = people_list[pname];
			if(pname != self_name){
				listhtml += '<div class="listitem menuitm" >';
				listhtml += '<div class="avatar" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + p.avatar + ')"></div>';
				listhtml += '<div class="label">' + pname + '</div>';
				listhtml += '<div class="flex_1"></div>';
				if(j == 1){
					listhtml += '<div class="flex_none ico ico_speaker fixed" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/ico_plist_speaker_x.svg)"></div>';
				}else{
					if(j == 0){
						listhtml += '<div class="flex_none ico ico_msg fixed" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/ico_plist_msg.svg)"></div>';
					}
					listhtml += '<div class="flex_none ico ico_mute autohide" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/ico_plist_mute.svg)"></div>';
				}
				listhtml += '<div class="marginr flex_none"></div>';
				listhtml += '</div>';
			}
		}

		listhtml += '<div class="sub_header" >Invited</div>';

		var pname = 'Simon Damiano';
		var p = people_list[pname];
		listhtml += '<div class="listitem menuitm" >';
		listhtml += '<div class="avatar" style="background-image:url(' + hypeDocument.resourcesFolderURL() + '/' + p.avatar + ')"></div>';
		listhtml += '<div class="label_line1">' + pname + '</div>';
		listhtml += '<div class="label_line2">Active</div>';
		listhtml += '</div>';

		$('#roster_panel .plist').html(listhtml);

		if(self_audio_muted){
			$('.ico_self_muted').show();
		}


		$('#roster_panel .plist .listitem').off('mousemove');
		$("#roster_panel .plist .listitem").on('mousemove', function(evt){
			evt.stopPropagation();
			$(this).find('.ico.autohide').show();
			$(this).find('.ico.autohide').addClass('button');
		});

		$('#roster_panel .plist .listitem').off('mouseout');
		$("#roster_panel .plist .listitem").on('mouseout', function(evt){
			evt.stopPropagation();
			$(this).find('.ico.autohide').hide();
			$(this).find('.ico.autohide').removeClass('button');
		});

		$('#roster_panel .plist .ico_mute').off('click');
		$("#roster_panel .plist .ico_mute").on('click', function(evt){
			evt.stopPropagation();
			if($(this).hasClass('button')){
				if($(this).hasClass('selected')){
					$(this).removeClass('selected');
					$(this).removeClass('fixed');
					$(this).addClass('autohide');
					$(this).css('background-image', 'url(' + hypeDocument.resourcesFolderURL() + '/ico_plist_mute.svg)');
				}else{
					$(this).addClass('selected');
					$(this).addClass('fixed');
					$(this).removeClass('autohide');
					$(this).css('background-image', 'url(' + hypeDocument.resourcesFolderURL() + '/ico_plist_mute_white.svg)');
				}
			}
		});

    }

    function hideRosterPanel(closeFrom){
    	if(!rosterPanelIsVisible){
    		return;
    	}
    	rosterClosedFrom = closeFrom;
    	rosterPanelIsVisible = false;

    	var w = $('#mainframe').width()
		$('#rightPanel').css('width', w);
		$('#rightPanel').removeClass('openright');
		$('#roster_panel').removeClass('show');

    }

    function setPeopleAvatarTop(animated){
    	var duration = 0;
    	if(animated){
    		duration = 300;
    	}
    	if(inCallActivityPanelIsVisible || in_share){
			$('#inCallPanel .audio_only .people-avatar').stop().animate({
    			top: 10
	    	}, {
	    		duration: duration,
	    		queue: false
	    	});
		}else{
			$('#inCallPanel .audio_only .people-avatar').stop().animate({
    			top: 240
	    	}, {
	    		duration: duration,
	    		queue: false
	    	});
		}
    }

	$('#inCallActivityPanel .btn_chat').on('click', function(evt){		
		evt.stopPropagation();

		showInMeetingPanels('chat')
		
	});
	
	
	$('#inCallActivityPanel .btn_share').on('click', function(evt){		
		evt.stopPropagation();
	
		showInMeetingPanels('share')

	});
	
	
	$('#inCallActivityPanel .btn_sch').on('click', function(evt){		
		evt.stopPropagation();

		showInMeetingPanels('schedule')

		
	});
	
	
	$('#inCallActivityPanel .btn_wb').on('click', function(evt){		
		evt.stopPropagation();

		showInMeetingPanels('whiteboard')
		
	});
	
	
	$('#inCallActivityPanel .btn_files').on('click', function(evt){		
		evt.stopPropagation();

		showInMeetingPanels('files')
		
	});
	
	
	$('#inCallActivityPanel .btn_tasks').on('click', function(evt){		
		evt.stopPropagation();

		showInMeetingPanels('tasks')
		
	});

	$('.roster_ico').on('click', function(evt){
		evt.stopPropagation();
		//showInMeetingPanels('people')

		if(!rosterPanelIsVisible){
			showRosterPanel();
		}else{
			hideRosterPanel('bubblehead');
		}

	});

	$('#roster_panel .close').on('click', function(evt){
		evt.stopPropagation();
		hideRosterPanel('self');
	});







	// -----------------------------------
	//       device pairing
	// -----------------------------------
	
	$('#connectToDevice').hide();
	$('#dp_share_screen').hide();
	$('#dp_share_space').hide();
	$('#leftPanel .modalColor').hide();
	var device_paired = false;

	function showDevicePairing (animated){
		$('#pop_device_pairing').show();
		var dur = animated ? 300 : 0;

		$('#pop_device_pairing .looking_for').show();
		$('#pop_device_pairing .nearby_devices').hide();
		$('#pop_device_pairing .search_devices').hide();

		$('#pop_device_pairing').css('height', '206px');

		setTimeout(showNearbyDevices, 2000, animated);

		$('#pop_device_pairing').animate({
			bottom: 10,
		},{
			duration:dur,
			queue:false,
			
		});

		$('#pop_device_pairing .bg').animate({
			opacity:1
		},{
			duration:dur/2,
			queue:false,
		});

		$('#leftPanel .modalColor').fadeIn();

	}

	function showNearbyDevices(animated){
		var dur = animated ? 300 : 0;

		$('#pop_device_pairing .looking_for').hide();
		$('#pop_device_pairing .nearby_devices').show();

		$('#pop_device_pairing').animate({
			height: 388,
		},{
			duration:dur,
			queue:false,
			
		});
	}

	function hideDevicePairing (animated){
		var dur = animated ? 300 : 0;

		$('#pop_device_pairing').animate({
			bottom:-500,
		},{
			duration:dur,
			queue:false,
			complete: function() {
    		}
		});

		$('#pop_device_pairing .bg').animate({
			//opacity:0.24
		},{
			duration:dur*2,
			queue:false,
		});

		$('#leftPanel .modalColor').stop().fadeOut(100);

	}

	$('#dp_device_pin').hide();
	function connectDevice(showPin){
		if(showPin){
			$('#dp_device_pin').show();
			$('#dp_device_pin .p1').show();
			$('#dp_device_pin .p2').hide();
			$('#dp_device_pin .p3').hide();
		}else{

			setTimeout(connectDeviceOk, 2000);
		}


		$('#pop_device_pairing').hide();
		$('#pop_device_paired').show();
		$('#pop_device_paired').stop();

		$('#pop_device_paired .title').text('Connect to a device');


		$('#pop_device_paired .gray').show();

		$('#pop_device_paired').css('height', pop_device_paired_h2+'px');
		$('#pop_device_paired').css('bottom', 10+'px');
	}

	function connectDeviceOk(){

		$('#pop_device_paired .title').text('Connected');
		$('#pop_device_paired .gray').hide();

		device_paired = true;

		$('#btn_device_pairing .lb_pairing').hide();
		$('#btn_device_pairing .lb_paired').show();
	}


	var options_exp = false;
	var pop_device_paired_h0 = 168;
	var pop_device_paired_h1 = 376;
	var pop_device_paired_h2 = 292;
	var tmo_hide_auto_paired;

	function showAutoDevicePaired (animated){
		$('#pop_device_paired').show();
		$('#pop_device_paired .ico_help').hide();
		$('#pop_device_paired .gray').hide();

		hideDevicePairing(false);

		var dur = animated ? 300 : 0;

		var h = pop_device_paired_h0;

		$('#pop_device_paired').animate({
			height:h,
			bottom:10
		},{
			duration:dur,
			queue:false,
		});

		$('#leftPanel .modalColor').fadeIn();

		device_paired = true;

		$('#btn_device_pairing .lb_pairing').hide();
		$('#btn_device_pairing .lb_paired').show();
		
		tmo_hide_auto_paired = setTimeout(hideDevicePaired, 3000, false);
	}

	function showDevicePaired (animated){
		clearTimeout(tmo_hide_auto_paired);

		$('#pop_device_paired').show();

		var dur = animated ? 300 : 0;

		var h = options_exp ? pop_device_paired_h1 : pop_device_paired_h2;

		$('#pop_device_paired').animate({
			height:h,
			bottom:10
		},{
			duration:dur,
			queue:false,
		});

		$('#leftPanel .modalColor').fadeIn();

	}
	function hideDevicePaired (animated, callback){
		clearTimeout(tmo_hide_auto_paired);

		var dur = animated ? 300 : 0;

		$('#pop_device_paired').animate({
			bottom:-500
		},{
			duration:dur,
			queue:false,
			complete:function(){
				if(callback){
					callback();
				}
			}
		});

		$('#leftPanel .modalColor').stop().fadeOut(100);
	}

	hideDevicePairing(false);
	hideDevicePaired(false);


	$('#btn_device_pairing').on('click', function(evt){
		evt.stopPropagation();
		if(!device_paired){
			showDevicePairing(true);
		}else{
			showDevicePaired(true);
		}
		
	});

	$('#pop_device_paired').on('click', function(evt){
		evt.stopPropagation();

		$('#pop_device_paired .ico_help').show();
		showDevicePaired(true);
	});


	$('#pop_device_pairing .btn_search').on('click', function(evt){
		evt.stopPropagation();
		$('#pop_device_pairing .search_devices').show();
		$('#pop_device_pairing .search_devices .p1').show();
		$('#pop_device_pairing .search_devices .p2').hide();


		$('#pop_device_pairing').animate({
			height: 388,
		},{
			duration:300,
			queue:false,
			
		});
		
	});

	$('#pop_device_pairing .search_devices .cancel').on('click', function(evt){
		evt.stopPropagation();
		$('#pop_device_pairing .search_devices').hide();
		
	});

	$('#pop_device_pairing .search_devices .ipt').on('click', function(evt){
		evt.stopPropagation();
		$('#pop_device_pairing .search_devices .p1').hide();
		$('#pop_device_pairing .search_devices .p2').show();
		
	});

	$('#pop_device_pairing .itm0').on('click', function(evt){
		evt.stopPropagation();
		connectDevice();
		
	});
	$('#pop_device_pairing .itm0_pin').on('click', function(evt){
		evt.stopPropagation();
		connectDevice(true);
		
	});

	$('#dp_device_pin .p1 .b_next').on('click', function(evt){
		evt.stopPropagation();
		$('#dp_device_pin .p1').hide();
		$('#dp_device_pin .p2').show();
	});
	$('#dp_device_pin .p2 .b_next').on('click', function(evt){
		evt.stopPropagation();
		$('#dp_device_pin .p2').hide();
		$('#dp_device_pin .p3').show();

		setTimeout(function(){
			$('#dp_device_pin').hide();
		}, 2000);

		setTimeout(connectDeviceOk, 4000);
	});
	$('#dp_device_pin .cancel').on('click', function(evt){
		evt.stopPropagation();
		$('#dp_device_pin').hide();
		
		$('#pop_device_pairing').show();
		$('#pop_device_paired').hide();

	});



	
	$('#btn_not_connecting').on('click', function(evt){
		evt.stopPropagation();
		hideDevicePairing(true);
		$('#connectToDevice').fadeIn();
	});

	$('#connectToDevice .btn_connect_device').on('click', function(evt){
		evt.stopPropagation();
		$('#connectToDevice').fadeOut(100);


		device_paired = true;

		hideDevicePaired(false);
		showDevicePaired(true);

		$('#btn_device_pairing .lb_pairing').hide();
		$('#btn_device_pairing .lb_paired').show();

	});

	$('#connectToDevice .close').on('click', function(evt){
		evt.stopPropagation();
		$('#connectToDevice').fadeOut(100);
	});

	$('#pop_device_paired .btn_options').on('click', function(evt){
		evt.stopPropagation();

		if(!options_exp){
			$('#pop_device_paired').animate({
				height:pop_device_paired_h1
			},{
				duration:300,
				queue:false,
			});
			$('#pop_device_paired .btn_options .ico2').show();
			$('#pop_device_paired .btn_options .ico1').hide();

			options_exp = true;

		}else{
			$('#pop_device_paired').animate({
				height:pop_device_paired_h2
			},{
				duration:300,
				queue:false,
			});
			$('#pop_device_paired .btn_options .ico1').show();
			$('#pop_device_paired .btn_options .ico2').hide();

			options_exp = false;
		}
		
	});

	$('#pop_device_paired .btn_disconnect').on('click', function(evt){
		evt.stopPropagation();

		disconnectDevicePaired()
		
	});

	function disconnectDevicePaired(){
		device_paired = false;
		options_exp = false;
		
		showDevicePairing(false);
		hideDevicePaired(false);
		showNearbyDevices(false);

		$('#btn_device_pairing .lb_pairing').show();
		$('#btn_device_pairing .lb_paired').hide();
	}

	
	$('#dp_turn_off_auto_connect').hide();
	$('#pop_device_paired .ck_auto_connect').on('click', function(evt){
		evt.stopPropagation();
		$('#dp_turn_off_auto_connect').show();
	});
	$('#dp_turn_off_auto_connect .ok').on('click', function(evt){
		evt.stopPropagation();
		disconnectDevicePaired();
		$('#dp_turn_off_auto_connect').hide();
	});
	$('#dp_turn_off_auto_connect .cancel').on('click', function(evt){
		evt.stopPropagation();
		$('#dp_turn_off_auto_connect').hide();
	});



	$('#pop_device_paired .btn_share_screen').on('click', function(evt){
		evt.stopPropagation();
		
		hideDevicePaired(true);
		$('#dp_share_screen').fadeIn();
		
	});

	$('#app_reminder').hide();
	$('#dp_share_screen .itm_app').css('opacity', 0);
	$('#dp_share_screen .itm_app').on('click', function(evt){
		evt.stopPropagation();
		
		hideDevicePaired(true);

		$('#appholder').show();
		$('#appholder').append($('#app_reminder'));
		$('#app_reminder .dis').hide();
		$('#app_reminder .act').show();
		$('#app_reminder').show();
		$('#desktop .stop_sharing').show();
		$('#desktop .stop_sharing .lb').html('You are sharing <b>Reminders</b>');
		$('#dp_share_screen').hide();
		$('#dp_share_screen .itm_app').css('opacity', 1);


		
	});

	$('#mainframe').on('mousedown', function(evt){
		
		$('#appholder_low').append($('#app_reminder'));
		$('#app_reminder .dis').show();
		$('#app_reminder .act').hide();
		
	});

	$('#app_reminder').on('mousedown', function(evt){
		
		//$('#appholder').append($('#app_reminder'));
		//$('#app_reminder .dis').hide();
		//$('#app_reminder .act').show();
		
	});

	$('#pop_device_paired .btn_share_space').on('click', function(evt){
		evt.stopPropagation();
		
		hideDevicePaired(true);
		$('#dp_share_space').fadeIn();
	});

	$('#dp_share_screen .close').on('click', function(evt){
		evt.stopPropagation();
		$('#dp_share_screen').fadeOut(100);
	});
	
	$('#dp_share_space .close').on('click', function(evt){
		evt.stopPropagation();
		$('#dp_share_space').fadeOut(100);
	});



	// -----------------------------------
	//       Time
	// -----------------------------------
	function setTime(){
		var date = new Date();
		$('.nowtime').text(formatNum(date.getHours()) + ':' + formatNum(date.getMinutes()));
	}
	function formatNum(n){
		if(n < 10){
			return ('0'+n);
		}else{
			return n;
		}
	}
	setInterval(setTime, 1000);
	setTime();



	// -----------------------------------
	//       Hit test
	// -----------------------------------

	function globalHitTest(e){
		
		var xPos = e.pageX;
	    var yPos = e.pageY;

	    if(!$('#create_menu').hitTest(xPos, yPos)){
			$('#create_menu').fadeOut(100);
	    }

	    if(!$('#people_options').hitTest(xPos, yPos)){
			$('#people_options').fadeOut(100);
	    }

	    if(!$('#intersPanel .menu').hitTest(xPos, yPos)){
			$('#intersPanel .menu').fadeOut();
	    }

	    if(!$('#inCallPanel .pop_more').hitTest(xPos, yPos)){
			$('#inCallPanel .pop_more').fadeOut(100);
	    }

	    if(!$('#pop_meetingdetails .wrap').hitTest(xPos, yPos)){
			$('#pop_meetingdetails').fadeOut(100);
	    }

	    if(!$('#pop_contact_card .wrap').hitTest(xPos, yPos) && !$('#pop_contact_card .arrow').hitTest(xPos, yPos)){
			hideContactCard();
	    }

	    if(!$('#menubar .menu1').hitTest(xPos, yPos) && !$('#menubar .baritm1').hitTest(xPos, yPos)){
			$('#menubar .menu1').fadeOut(100);
			$('#menubar .baritm1').removeClass('selected');
	    }

	    if(!$('#self_avatar').hitTest(xPos, yPos) && !$('#pop_mystuff').hitTest(xPos, yPos) && !$('#pop_mystuff .sub_status').hitTest(xPos, yPos)){
			$('#pop_mystuff').fadeOut(100);
			$('#pop_mystuff .sub_status').hide();
	    }

	    if(!$('#pop_device_pairing').hitTest(xPos, yPos) && !inSearchView && !$('#dp_device_pin').is(':visible') && !$('#dp_turn_off_auto_connect').is(':visible') ){
			hideDevicePairing(true);
	    }

	    if(!$('#pop_device_paired').hitTest(xPos, yPos) && !inSearchView && !$('#dp_device_pin').is(':visible') && !$('#dp_turn_off_auto_connect').is(':visible') ){
			hideDevicePaired(true);
	    }

	}

	$('body').on('mousedown', globalHitTest);



	// -----------------------------------
	//       Tooltip
	// -----------------------------------

	// register tooltip (black arrow)
	var tooltip_delay_itv;
	function regTooltip(elem, direction){

		$('#tip_with_triangle_up').hide();
		$('#tip_with_triangle_down').hide();

		elem.off('mouseover');
		elem.off('mouseout');

		var delay = 200;

		elem.on('mouseover', function(evt){
			evt.stopPropagation();
			var lb = $(this).attr('tooltip') || $(this).attr('title');
			var top;
			var tooltip;
			if(direction == 'up'){
				tooltip = $('#tip_with_triangle_up');

				var elemL = $(this).offset().left;
				var elemT = $(this).offset().top;

				var deskL = $('#desktop').offset().left;
				var deskT = $('#desktop').offset().top;
				top = elemT - deskT + $(this).height() - 6;

			}else if(direction == 'down'){
				tooltip = $('#tip_with_triangle_down');

				var elemL = $(this).offset().left;
				var elemT = $(this).offset().top;

				var deskL = $('#desktop').offset().left;
				var deskT = $('#desktop').offset().top;
				top = elemT - deskT - tooltip.height() - 5;
			}

			var left = elemL - deskL + $(this).width()/2 - tooltip.width()/2;
			
			tooltip.find('.lb').text(lb);
			tooltip.css('top', top+'px');
			tooltip.css('left', left+'px');

			tooltip_delay_itv = setTimeout(function(){
				tooltip.stop().fadeIn(100);
			}, delay)
			
		});

		elem.on('mouseout', function(evt){
			evt.stopPropagation();
			clearTimeout(tooltip_delay_itv);
			$('#tip_with_triangle_up').stop().fadeOut(100);
			$('#tip_with_triangle_down').stop().fadeOut(100);
		});

		elem.on('mousedown', function(evt){
			clearTimeout(tooltip_delay_itv);
			$('#tip_with_triangle_up').stop().fadeOut(100);
			$('#tip_with_triangle_down').stop().fadeOut(100);
		});
	}

	// add tooltips
	$('#waffleMenu .ico_add_people').attr('tooltip', 'Add members');
	regTooltip($('#waffleMenu .ico_add_people'), 'down');

	$('#waffleMenu .ico_setting').attr('tooltip', 'Space settings');
	regTooltip($('#waffleMenu .ico_setting'), 'down');

	/*$('#self_avatar').attr('tooltip', 'My stuff');
	regTooltip($('#self_avatar'), 'up');*/ // 011218 Fi remove tooltip for mystuff

	$('#btn_left_panel_add').attr('tooltip', 'New message or meeting');
	regTooltip($('#btn_left_panel_add'), 'up');



	// in call controls
	$('#inCallPanel .ctrl .btn_mute').attr('tooltip', 'Mute');
	regTooltip($('#inCallPanel .ctrl .btn_mute'), 'down');

	$('#inCallPanel .ctrl .btn_video').attr('tooltip', 'Turn off camera');
	regTooltip($('#inCallPanel .ctrl .btn_video'), 'down');

	$('#inCallPanel .ctrl .btn_video_camoff').attr('tooltip', 'Turn on camera');
	regTooltip($('#inCallPanel .ctrl .btn_video_camoff'), 'down');

	$('#inCallPanel .ctrl .btn_share').attr('tooltip', 'Share my screen');
	regTooltip($('#inCallPanel .ctrl .btn_share'), 'down');

	$('#inCallPanel .ctrl .btn_more').attr('tooltip', 'More');
	regTooltip($('#inCallPanel .ctrl .btn_more'), 'down');

	$('#inCallPanel .ctrl .btn_end').attr('tooltip', 'Leave meeting');
	regTooltip($('#inCallPanel .ctrl .btn_end'), 'down');

	$('#inCallPanel .ctrl .btn_plus').attr('tooltip', 'More options');
	regTooltip($('#inCallPanel .ctrl .btn_plus'), 'down');

	$('#inCallPanel .roster_ico').attr('tooltip', 'Manage participants');
	regTooltip($('#inCallPanel .roster_ico'), 'up');

} // end of window.mainFunc





// min ≤ r ≤ max
function randomNumRange(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
}


// google analytics event tracking
function trackEvent(category, action, label){
	/*
	ga('send', {
	  hitType: 'event',
	  eventCategory: category,
	  eventAction: action,
	  eventLabel: label
	});
	*/
	gtag('event', action, {
	  'event_category': category,
	  'event_label': label
	});
}

function trackTime(category, action, time){
	gtag('event', 'timing_complete', {
	  'name': action,
	  'value': time,
	  'event_category': category
	});
}

function resetCallConnect(){
	callConnect = 0;
}


